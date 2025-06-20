const ldap = require('ldapjs');

class LdapAuth {
  constructor(host, port, baseDn) {
    this.ldapHost = host;
    this.ldapPort = port;
    this.ldapBaseDn = baseDn;
    this.ldapClient = null;
  }
  async connect() {
    if (this.ldapClient === null) {
      return new Promise((resolve, reject) => {
        console.log("Initial variable to connect");
        console.log("URL =", `ldap://${this.ldapHost}:${this.ldapPort}`);

        const client = ldap.createClient({
          url: `ldap://${this.ldapHost}:${this.ldapPort}`,
          timeout: 5000,
          connectTimeout: 10000
        });

        client.on('error', (err) => {
          reject(new Error('Failed to connect to LDAP server: ' + err.message));
        });

        client.bind('', '', (err) => {
          if (err) {
            reject(new Error('Cannot bind to LDAP server anonymously: ' + err.message));
          } else {
            this.ldapClient = client;
            resolve();
          }
        });
      });
    }
  }

  async authenticate(username, password) {
    try {
      await this.connect();

      return new Promise((resolve, reject) => {
        const searchOptions = {
          scope: 'sub',
          filter: `(mail=${username})`
        };

        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) {
            reject(new Error('LDAP search failed: ' + err.message));
            return;
          }

          res.on('searchEntry', (entry) => {
            const userDn = entry.objectName || entry.dn;
            const user = entry.pojo || entry.toObject();

            console.log("Found DN:", userDn);
            console.log("User object from LDAP:", user);

            const client = ldap.createClient({
              url: `ldap://${this.ldapHost}:${this.ldapPort}`
            });

            client.on('error', (err) => {
              console.error("Bind client error:", err.message);
            });

            client.bind(String(userDn), String(password), (err) => {
              client.unbind();
              if (err) {
                switch (err.code) {
                  case 49: console.log("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); break;
                  case 32: console.log("ไม่พบบัญชีผู้ใช้"); break;
                  case 53: console.log("บัญชีผู้ใช้ถูกปิดการใช้งานหรือหมดอายุ"); break;
                  default: console.log("เกิดข้อผิดพลาดในการ authenticate:", err.message);
                }
                reject(new Error('Authentication failed'));
                return;
              }
              resolve(true);
            });
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });

          res.on('end', () => {});
        });
      });
    } catch (error) {
      console.error('Authentication error:', error.message);
      return false;
    }
  }

  async getUserInfo(username) {
    try {
      await this.connect();

      return new Promise((resolve, reject) => {
        const searchOptions = {
          scope: 'sub',
          filter: `(mail=${username})`
        };

        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) {
            reject(new Error('LDAP search failed: ' + err.message));
            return;
          }
          let userData = null;
          res.on('searchEntry', (entry) => {
            const user = entry.pojo || entry.toObject();

            const getValue = (type) => {
              const attr = user.attributes.find(a => a.type === type);
              return attr ? attr.values[0] : null;
            };

            userData = {
              uid: getValue('uid'),
              mail: getValue('mail'),
              givenName: getValue('givenName'),
              sn: getValue('sn'),
              cn: getValue('cn'),
              employeeType: getValue('employeeType'),
              o: getValue('o'),
              dn: entry.dn
            };

            console.log("LDAP User Info:", userData);
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });

          res.on('end', () => {
            console.log("User Data:", userData);
            resolve(userData);
          });
        });
      });
    } catch (error) {
      console.error('Get user info error:', error.message);
      return null;
    }
  }

  async close() {
    if (this.ldapClient) {
      this.ldapClient.unbind();
      this.ldapClient.destroy();
      this.ldapClient = null;
    }
  }
}

module.exports = LdapAuth;
