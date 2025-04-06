const ldap = require('ldapjs');

class LdapAuth {
  constructor(host, port, baseDn) {
    this.ldapHost = host;
    this.ldapPort = port;
    this.ldapBaseDn = baseDn;
    this.ldapClient = null;
  }

  // Connect to LDAP server with anonymous bind
  async connect() {
    if (this.ldapClient === null) {
      return new Promise((resolve, reject) => {
        const client = ldap.createClient({
          url: `ldap://${this.ldapHost}:${this.ldapPort}`,
          timeout: 5010,
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

  // Authenticate user and return user info
  async authenticate(username, password) {
    try {
      await this.connect();

      return new Promise((resolve, reject) => {
        const searchOptions = {
          scope: 'sub',
          filter: `(mail=${username})`, // You can change to (uid=${username}) or (sAMAccountName=${username}) as needed
        };

        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) {
            reject(new Error('LDAP search failed: ' + err.message));
            return;
          }

          let found = false;

          res.on('searchEntry', (entry) => {
            found = true;
            const userDn = entry.objectName;
            const user = entry.object;

            const client = ldap.createClient({
              url: `ldap://${this.ldapHost}:${this.ldapPort}`
            });

            client.bind(String(userDn), String(password), (err) => {
              if (err) {
                switch (err.code) {
                  case 49:
                    console.log("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                    break;
                  case 32:
                    console.log("ไม่พบบัญชีผู้ใช้");
                    break;
                  case 53:
                    console.log("บัญชีผู้ใช้ถูกปิดการใช้งานหรือหมดอายุ");
                    break;
                  default:
                    console.log("เกิดข้อผิดพลาดในการ authenticate:", err.message);
                }
                reject(new Error('Authentication failed'));
                return;
              }

              // Successful login, return user object
              resolve(user);
            });
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });

          res.on('end', (result) => {
            if (!found) {
              reject(new Error('User not found'));
            }
          });
        });
      });
    } catch (error) {
      return false;
    }
  }

  // Get user information by email
  async getUserInfo(username) {
    try {
      await this.connect();

      return new Promise((resolve, reject) => {
        const searchOptions = {
          scope: 'sub',
          filter: `(mail=${username})`,
        };

        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) {
            reject(new Error('LDAP search failed: ' + err.message));
            return;
          }

          let userData = null;

          res.on('searchEntry', (entry) => {
            userData = entry.object;
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });

          res.on('end', () => {
            resolve(userData);
          });
        });
      });
    } catch (error) {
      return null;
    }
  }

  // Close LDAP connection
  close() {
    if (this.ldapClient) {
      this.ldapClient.unbind();
      this.ldapClient.destroy();
      this.ldapClient = null;
    }
  }
}

module.exports = LdapAuth;
