// const ldap = require('ldapjs');

// class LdapAuth {
//   constructor(host, port, baseDn) {
//     this.ldapHost = host;
//     this.ldapPort = port;
//     this.ldapBaseDn = baseDn;
//     this.ldapClient = null;
//   }

//   // Connect to LDAP server with anonymous bind
  

//   async connect() {
//    // console.log("befor connnect");
//     if (this.ldapClient === null) {
//       return new Promise((resolve, reject) => {
//         console.log("initial variable to connect");
//         console.log("Url="+`ldap://${this.ldapHost}:${this.ldapPort}`)
//         const client = ldap.createClient({
//           url: `ldap://${this.ldapHost}:${this.ldapPort}`,
//           timeout: 5000,
//           connectTimeout: 10000
//         });

//         client.on('error', (err) => {
//           reject(new Error('Failed to connect to LDAP server: ' + err.message));
//         });

//         // Attempt anonymous bind
//         client.bind('', '', (err) => {
//           if (err) {
//             reject(new Error('Cannot bind to LDAP server anonymously: ' + err.message));
//           } else {
//             this.ldapClient = client;
//             resolve();
//           }
//         });
//       });
//     }
//   }

//   // Authenticate user
//   async authenticate(username, password) {
//     try {
//       await this.connect();

//       return new Promise((resolve, reject) => {
//         const searchOptions = {
//           scope: 'sub',
//           filter: `(mail=${username})`,
//         };

      
//         this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
//           if (err) {
//             reject(new Error('LDAP search failed: ' + err.message));
//             return;
//           } 

//           let found = false;

//           res.on('searchEntry', (entry) => {
//             found = true;
//             const userDn = entry.objectName;

//             //console.log("userDn=".userDn);
//             const user = entry.object;
           

//             // Try to bind with user credentials
//             const client = ldap.createClient({
//               url: `ldap://${this.ldapHost}:${this.ldapPort}`
//             });
//             //console.log("befor bind LDAP, userDn="+userDn+" password="+password);

//             client.bind(String(userDn), String(password), (err) => {

//               if (err) {
//                 switch(err.code) {
//                     case 49: // Invalid credentials
//                         console.log("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
//                         break;
//                     case 32: // No such object
//                         console.log("ไม่พบบัญชีผู้ใช้");
//                         break;
//                     case 53: // Account disabled/expired
//                         console.log("บัญชีผู้ใช้ถูกปิดการใช้งานหรือหมดอายุ");
//                         break;
//                     default:
//                         console.log("เกิดข้อผิดพลาดในการ authenticate:", err.message);
//                 }
//                 reject(new Error('Authentication failed'));
//                 return;
//             }
//             // ถ้าสำเร็จ
//             resolve(true);
//             });
//           });

//           res.on('error', (err) => {
//             reject(new Error('LDAP search error: ' + err.message));
//           });

//           res.on('end', (result) => {
//             if (!found) {
//               reject(new Error('User not found'));
//             }
//           });
//         });
//       });
//     } catch (error) {
//       // You can add error logging here
//       // console.error('Authentication error:', error);
//       return false;
//     }
//   }

//   // Get user information
//   async getUserInfo(username) {
//     try {
//       await this.connect();

//       return new Promise((resolve, reject) => {
//         const searchOptions = {
//           scope: 'sub',
//           filter: `(mail=${username})`,
//         };

//         this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
//           if (err) {
//             reject(new Error('LDAP search failed: ' + err.message));
//             return;
//           }

//           let userData = null;

//           res.on('searchEntry', (entry) => {
//             userData = entry.object;
//           });

//           res.on('error', (err) => {
//             reject(new Error('LDAP search error: ' + err.message));
//           });

//           res.on('end', () => {
//             resolve(userData);
//           });
//         });
//       });
//     } catch (error) {
//       // You can add error logging here
//       // console.error('Get user info error:', error);
//       return null;
//     }
//   }

//   // Close LDAP connection
//   close() {
//     if (this.ldapClient) {
//       this.ldapClient.unbind();
//       this.ldapClient.destroy();
//       this.ldapClient = null;
//     }
//   }
// }

// module.exports = LdapAuth;





//LDAP test
const ldap = require('ldapjs');

class LdapAuth {
  constructor(host, port, baseDn) {
    this.ldapHost = host;
    this.ldapPort = port;
    this.ldapBaseDn = baseDn;
    this.ldapClient = null;
  }

  // เชื่อมต่อ LDAP Server แบบ Anonymous
  async connect() {
    if (this.ldapClient) {
      return; // ใช้ client เดิมถ้ายังเชื่อมต่ออยู่
    }

    return new Promise((resolve, reject) => {
      console.log(`Connecting to LDAP: ldap://${this.ldapHost}:${this.ldapPort}`);
      
      this.ldapClient = ldap.createClient({
        url: `ldap://${this.ldapHost}:${this.ldapPort}`,
        timeout: 5000,
        connectTimeout: 10000
      });

      this.ldapClient.on('error', (err) => {
        reject(new Error('Failed to connect to LDAP server: ' + err.message));
      });

      // Bind แบบ Anonymous
      this.ldapClient.bind('', '', (err) => {
        if (err) {
          reject(new Error('Cannot bind to LDAP server: ' + err.message));
        } else {
          resolve();
        }
      });
    });
  }

  // ตรวจสอบการเข้าสู่ระบบ (Authenticate)
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

            console.log(`User found: ${userDn}`);

            // Bind ด้วย username และ password ที่รับเข้ามา
            const userClient = ldap.createClient({
              url: `ldap://${this.ldapHost}:${this.ldapPort}`
            });

            userClient.bind(userDn, password, (err) => {
              if (err) {
                let errorMessage = 'Authentication failed';
                switch (err.code) {
                  case 49: errorMessage = 'Invalid credentials'; break;
                  case 32: errorMessage = 'User not found'; break;
                  case 53: errorMessage = 'Account disabled/expired'; break;
                  default: errorMessage = `LDAP Error: ${err.message}`;
                }
                console.log(errorMessage);
                userClient.unbind(); // ปิดการเชื่อมต่อ
                reject(new Error(errorMessage));
                return;
              }

              console.log(`User ${username} authenticated successfully.`);
              userClient.unbind(); // ปิดการเชื่อมต่อหลังจากใช้งานเสร็จ
              resolve(true);
            });
          });

          res.on('end', () => {
            if (!found) {
              reject(new Error('User not found'));
            }
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });
        });
      });
    } catch (error) {
      console.error('Authentication error:', error.message);
      return false;
    }
  }

  // ดึงข้อมูลผู้ใช้จาก LDAP
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

          res.on('end', () => {
            if (userData) {
              resolve(userData);
            } else {
              reject(new Error('User not found'));
            }
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });
        });
      });
    } catch (error) {
      console.error('Get user info error:', error.message);
      return null;
    }
  }

  // ปิดการเชื่อมต่อ LDAP
  close() {
    if (this.ldapClient) {
      this.ldapClient.unbind(); // ใช้ unbind เท่านั้น ไม่ต้อง destroy
      this.ldapClient = null;
      console.log('LDAP connection closed.');
    }
  }
}

module.exports = LdapAuth;
