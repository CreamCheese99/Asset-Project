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
        console.log("initial variable to connect");
        console.log("Url=" + `ldap://${this.ldapHost}:${this.ldapPort}`);
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

      console.log("Authenticating user:", username);  // เพิ่ม log ที่นี่

      return new Promise((resolve, reject) => {
        const searchOptions = {
          scope: 'sub',
          filter: `(mail=${username})`,  // ฟิลเตอร์ที่ใช้ค้นหา
          attributes: ['mail']
        };

        console.log('Search filter:', `(mail=${username})`); // เพิ่ม log ที่นี่

        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) {
            reject(new Error('LDAP search failed: ' + err.message));
            return;
          }

          let found = false;

          res.on('searchEntry', (entry) => {
            found = true;
            const userDn = entry.objectName;

            // เพิ่ม log หลังจากที่ค้นหาเจอข้อมูล
            console.log('Found entry:', entry);

            const user = entry.object;

            // ตรวจสอบ entry.object ก่อนที่จะเข้าถึง mail
            if (user && user.mail) {
              console.log('Found mail:', user.mail);  // แสดงค่า mail ที่พบ
            } else {
              console.log('No mail field found for this entry');
              reject(new Error('Mail field not found'));
              return;
            }

            // Try to bind with user credentials
            const client = ldap.createClient({
              url: `ldap://${this.ldapHost}:${this.ldapPort}`
            });

            console.log("Attempting to bind with DN:", userDn);  // เพิ่ม log ที่นี่

            client.bind(String(userDn), String(password), (err) => {
              if (err) {
                switch (err.code) {
                  case 49: // Invalid credentials
                    console.log("Invalid username or password");
                    break;
                  case 32: // No such object
                    console.log("User not found");
                    break;
                  case 53: // Account disabled/expired
                    console.log("User account is disabled or expired");
                    break;
                  default:
                    console.log("Authentication error:", err.message);
                }
                reject(new Error('Authentication failed'));
                return;
              }

              // ถ้าสำเร็จ
              console.log("Authentication successful");
              resolve(true);
            });
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });

          res.on('end', (result) => {
            if (!found) {
              console.log('User not found');
              reject(new Error('User not found'));
            }
          });
        });
      });
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }


  // Get user information
async getUserInfo(username) {
    try {
      await this.connect();

      console.log('Fetching user info for:', username);

      return new Promise((resolve, reject) => {
        const searchOptions = {
          scope: 'sub',
          filter: `(mail=${username})`,  // ฟิลเตอร์ที่ใช้
          attributes: ['mail']  // กำหนดให้ดึงแค่ฟิลด์ 'mail'
        };

        console.log('Search filter for user info:', `(mail=${username})`);

        this.ldapClient.search(this.ldapBaseDn, searchOptions, (err, res) => {
          if (err) {
            reject(new Error('LDAP search failed: ' + err.message));
            return;
          }

          let userMail = null;

          res.on('searchEntry', (entry) => {
            console.log('Found entry:', entry);  // แสดงข้อมูลที่เจอ
            if (entry.object && entry.object.mail) {
              userMail = entry.object.mail;  // ดึงแค่ฟิลด์ mail
            } else {
              console.log('No mail field found for this entry');
            }
          });

          res.on('error', (err) => {
            reject(new Error('LDAP search error: ' + err.message));
          });

          res.on('end', () => {
            if (!userMail) {
              console.log('No user data found for mail:', username);
              reject(new Error('User not found'));
            } else {
              console.log('User mail:', userMail);  // แสดง mail ที่ได้
              resolve(userMail);
            }
          });
        });
      });
    } catch (error) {
      console.error('Get user info error:', error);
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


