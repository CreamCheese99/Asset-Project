const ldap = require('ldapjs');

class LdapAuth {
  constructor(host, port, baseDn) {
    this.ldapHost = host;
    this.ldapPort = port;
    this.ldapBaseDn = baseDn;
    this.ldapClient = null;
  }

  // เชื่อมต่อกับ LDAP server
  async connect() {
    if (this.ldapClient) return;

    return new Promise((resolve, reject) => {
      this.ldapClient = ldap.createClient({
        url: `ldap://${this.ldapHost}:${this.ldapPort}`,
        timeout: 5000,
        connectTimeout: 10000
      });

      this.ldapClient.bind('', '', (err) => {
        if (err) reject(new Error('Cannot bind to LDAP server: ' + err.message));
        else resolve();
      });
    });
  }

  // ตรวจสอบการ authenticate ผู้ใช้
  async authenticate(username, password) {
    try {
      await this.connect();
      return new Promise((resolve, reject) => {
        const searchOptions = { scope: 'sub', filter: `(mail=${username})` };
        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) return reject(new Error('LDAP search failed: ' + err.message));

          let found = false;
          res.on('searchEntry', (entry) => {
            found = true;
            const userDn = entry.objectName;

            // สร้าง client ใหม่เพื่อทำการ bind ด้วย userDn และ password
            const userClient = ldap.createClient({ url: `ldap://${this.ldapHost}:${this.ldapPort}` });

            // ทำการ bind ด้วย userDn และ password
            userClient.bind(userDn, password, (err) => {
              userClient.unbind();
              if (err) {
                // จัดการข้อผิดพลาดที่เกิดจาก invalid credentials
                switch (err.code) {
                  case 49: // Invalid credentials
                    reject(new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'));
                    break;
                  case 32: // No such object
                    reject(new Error('ไม่พบบัญชีผู้ใช้'));
                    break;
                  default:
                    reject(new Error('เกิดข้อผิดพลาดในการ authenticate'));
                }
                return;
              }
              resolve(true);
            });
          });

          res.on('end', () => {
            if (!found) reject(new Error('ไม่พบบัญชีผู้ใช้'));
          });
        });
      });
    } catch (error) {
      return false;
    }
  }

  // ปิดการเชื่อมต่อ LDAP
  close() {
    if (this.ldapClient) {
      this.ldapClient.unbind();
      this.ldapClient = null;
    }
  }
}

module.exports = LdapAuth;
