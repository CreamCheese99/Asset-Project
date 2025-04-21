// saveUserToDatabase.js
const pool = require('./db');

async function saveUserToDatabase(userInfo) {
  try {
    // Check if department exists
    let departmentId;
    const departmentResult = await pool.query(
      'SELECT department_id FROM department WHERE department_name = $1',
      [userInfo.o]
    );

    if (departmentResult.rows.length > 0) {
      departmentId = departmentResult.rows[0].department_id;
    } else {
      const insertDept = await pool.query(
        'INSERT INTO department (department_name) VALUES ($1) RETURNING department_id',
        [userInfo.o]
      );
      departmentId = insertDept.rows[0].department_id;
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [userInfo.mail]
    );

    if (existingUser.rows.length > 0) {
      // UPDATE user
      await pool.query(
        `UPDATE users 
         SET user_name = $1, department_id = $2 
         WHERE user_email = $3`,
        [userInfo.cn, departmentId, userInfo.mail]
      );
      console.log(` User ${userInfo.mail} updated.`);
    } else {
      // INSERT user
      await pool.query(
        `INSERT INTO users (user_name, user_email, department_id, role_id, password)
         VALUES ($1, $2, $3, $4, $5)`,
        [userInfo.cn, userInfo.mail, departmentId, 2, null]
      );
      console.log(` User ${userInfo.mail} inserted.`);
    }
  } catch (error) {
    console.error(' Error saving user to database:', error.message);
    throw error;
  }
}

module.exports = saveUserToDatabase;
