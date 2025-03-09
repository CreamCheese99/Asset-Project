// const ldap = require('ldapjs');

// class LdapAuth {
//   constructor(host, port, baseDn) {
//     this.ldapHost = host;
//     this.ldapPort = port;
//     this.ldapBaseDn = baseDn;
//     this.ldapClient = null;
//   }

//   // เชื่อมต่อกับ LDAP server
//   async connect() {
//     if (this.ldapClient) return;

//     return new Promise((resolve, reject) => {
//       this.ldapClient = ldap.createClient({
//         url: `ldap://${this.ldapHost}:${this.ldapPort}`,
//         timeout: 5000,
//         connectTimeout: 10000
//       });

//       this.ldapClient.bind('', '', (err) => {
//         if (err) reject(new Error('Cannot bind to LDAP server: ' + err.message));
//         else resolve();
//       });
//     });
//   }

//   // ตรวจสอบการ authenticate ผู้ใช้
//   async authenticate(username, password) {
//     try {
//       await this.connect();
//       return new Promise((resolve, reject) => {
//         const searchOptions = { scope: 'sub', filter: `(mail=${username})` };
//         this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
//           if (err) return reject(new Error('LDAP search failed: ' + err.message));

//           let found = false;
//           res.on('searchEntry', (entry) => {
//             found = true;
//             const userDn = entry.objectName;

//             // สร้าง client ใหม่เพื่อทำการ bind ด้วย userDn และ password
//             const userClient = ldap.createClient({ url: `ldap://${this.ldapHost}:${this.ldapPort}` });

//             // ทำการ bind ด้วย userDn และ password
//             userClient.bind(userDn, password, (err) => {
//               userClient.unbind();
//               if (err) {
//                 // จัดการข้อผิดพลาดที่เกิดจาก invalid credentials
//                 switch (err.code) {
//                   case 49: // Invalid credentials
//                     reject(new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'));
//                     break;
//                   case 32: // No such object
//                     reject(new Error('ไม่พบบัญชีผู้ใช้'));
//                     break;
//                   default:
//                     reject(new Error('เกิดข้อผิดพลาดในการ authenticate'));
//                 }
//                 return;
//               }
//               resolve(true);
//             });
//           });

//           res.on('end', () => {
//             if (!found) reject(new Error('ไม่พบบัญชีผู้ใช้'));
//           });
//         });
//       });
//     } catch (error) {
//       return false;
//     }
//   }

//   // ปิดการเชื่อมต่อ LDAP
//   close() {
//     if (this.ldapClient) {
//       this.ldapClient.unbind();
//       this.ldapClient = null;
//     }
//   }
// }

// module.exports = LdapAuth;


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
   // console.log("befor connnect");
    if (this.ldapClient === null) {
      return new Promise((resolve, reject) => {
        console.log("initial variable to connect");
        console.log("Url="+`ldap://${this.ldapHost}:${this.ldapPort}`)
        const client = ldap.createClient({
          url: `ldap://${this.ldapHost}:${this.ldapPort}`,
          timeout: 5000,
          connectTimeout: 10000
        });

        client.on('error', (err) => {
          reject(new Error('Failed to connect to LDAP server: ' + err.message));
        });

        // Attempt anonymous bind
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

  // Authenticate user
  async authenticate(username, password) {
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

          let found = false;

          res.on('searchEntry', (entry) => {
            found = true;
            const userDn = entry.objectName;

            //console.log("userDn=".userDn);
            const user = entry.object;
           

            // Try to bind with user credentials
            const client = ldap.createClient({
              url: `ldap://${this.ldapHost}:${this.ldapPort}`
            });
            //console.log("befor bind LDAP, userDn="+userDn+" password="+password);

            client.bind(String(userDn), String(password), (err) => {

              if (err) {
                switch(err.code) {
                    case 49: // Invalid credentials
                        console.log("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                        break;
                    case 32: // No such object
                        console.log("ไม่พบบัญชีผู้ใช้");
                        break;
                    case 53: // Account disabled/expired
                        console.log("บัญชีผู้ใช้ถูกปิดการใช้งานหรือหมดอายุ");
                        break;
                    default:
                        console.log("เกิดข้อผิดพลาดในการ authenticate:", err.message);
                }
                reject(new Error('Authentication failed'));
                return;
            }
            // ถ้าสำเร็จ
            resolve(true);
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
      // You can add error logging here
      // console.error('Authentication error:', error);
      return false;
    }
  }

  // Get user information
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
      // You can add error logging here
      // console.error('Get user info error:', error);
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
