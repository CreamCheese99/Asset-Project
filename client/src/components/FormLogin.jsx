import React, { useState } from 'react';
import axios from 'axios';
import FormInputField from './FormInputField';
import LogoSection from './LogoSection';

function FormLogin() {
  const [user_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันไม่ให้รีเฟรชหน้า
    setError(''); // ล้าง error ก่อนเริ่มใหม่

    if (!user_email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    try {
      setLoading(true);
      const requestData = {
        username: user_email.trim(),
        password: password.trim(),
      };

      console.log('ส่งข้อมูลเข้าสู่ระบบ:', requestData);

      const response = await axios.post('http://localhost:5000/api/login', requestData);
      console.log('การตอบกลับจากเซิร์ฟเวอร์:', response);

      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        // ตรวจสอบว่ามี token และ roleId จริง
        if (!data.token || !data.roleId) {
          setError('การตอบกลับจากเซิร์ฟเวอร์ไม่ถูกต้อง');
          setLoading(false);
          return;
        }

        // บันทึกข้อมูลลง localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('roleId', data.roleId);
        localStorage.setItem('userName', data.user_name);
        localStorage.setItem('departmentId', data.department_id);

        console.log('เข้าสู่ระบบสำเร็จ กำลังเปลี่ยนหน้า...');
        window.location.href = '/home'; // ทุก role ไปหน้าเดียวกัน
      } else {
        setError(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('เกิดข้อผิดพลาดขณะเข้าสู่ระบบ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 max-w-lg px-[60px] py-[54px] bg-white rounded-3xl shadow-inner flex flex-col items-center">
      <LogoSection />
      <h1>Log in</h1>
      <form onSubmit={handleLogin} className="w-96 space-y-8 text-left">
        <FormInputField
          label="Email"
          id="email"
          type="text"
          placeholder="Enter your email"
          value={user_email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ background: '#8bc34a' }}
          className={`w-full py-2 text-white text-base font-medium rounded-lg transition duration-200 ${
            loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default FormLogin;