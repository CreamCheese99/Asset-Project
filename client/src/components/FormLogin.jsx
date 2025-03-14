// import React from 'react'
// import FormInputField from './FormInputField'
// import LogoSection from './LogoSection'

// function FormLogin() {
//   return (
//     <div className="w-full space-y-4 max-w-lg px-[60px] py-[54px] bg-white rounded-3xl shadow-inner flex flex-col items-center">
//     <LogoSection />
//     <h1>เข้าสู่ระบบ</h1>
//     <div className="w-96 space-y-8 text-left">

//       <FormInputField label="Username" id="username" type="text" placeholder="Enter your username" />
//       <FormInputField label="Password" id="password" type="password" placeholder="Enter your password" />
//       <button style={{ background: '#8bc34a'}} className="w-full py-2  text-white text-base font-medium rounded-lg hover:bg-gray-300 transition duration-200">
//         Login
//       </button>
//     </div>
//   </div>
//   )
// }

// export default FormLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import FormInputField from './FormInputField';
import LogoSection from './LogoSection';

function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!username || !password) {
      setError("กรุณากรอก Username และ Password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("เข้าสู่ระบบสำเร็จ!");
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ บันทึกข้อมูลผู้ใช้
        navigate("/"); // นำทางไปหน้า Dashboard
      } else {
        alert("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง!");
        setError("Username หรือ Password ไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="w-full space-y-4 max-w-lg px-[60px] py-[54px] bg-white rounded-3xl shadow-inner flex flex-col items-center">
      <LogoSection />
      <h1>เข้าสู่ระบบ</h1>
      <div className="w-96 space-y-8 text-left">
        {/* รับค่าจาก input และอัปเดต state */}
        <FormInputField
          label="Username"
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin} 
          style={{ background: '#8bc34a' }}
          className="w-full py-2 text-white text-base font-medium rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default FormLogin;
