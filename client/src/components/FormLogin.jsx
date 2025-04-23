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
import React, { useState } from "react";
import axios from "axios"; // Import axios
import FormInputField from "./FormInputField";
import LogoSection from "./LogoSection";

function FormLogin() {
  const [user_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    console.log("Form submit triggered"); // ตรวจสอบว่าฟังก์ชันถูกเรียก

    // Check if both email and password are provided
    if (!user_email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const requestData = {
        user_email: user_email,
        password: password,
      };

      console.log("Sending request data:", requestData); // Log request data

      // Send the request to the login API
      const response = await axios.post(
        "http://localhost:5001/login",
        requestData
      );

      console.log("Received response:", response); // ตรวจสอบการตอบกลับจาก API

      const data = response.data;
      if (response.status === 200) {
        // Store token and roleId in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("roleId", data.roleId);
        localStorage.setItem("userName", data.user_name);

        // Redirect based on roleId
        if (data.roleId === 1) {
          window.location.href = "/home";
        } else if (data.roleId === 2) {
          window.location.href = "/home";
        } else if (data.roleId === 3) {
          window.location.href = "/home";
        } else if (data.roleId === 4) {
          window.location.href = "/home";
        }
      } else {
        setError(data.message); // Display API error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("เกิดข้อผิดพลาดขณะเข้าสู่ระบบ"); // แก้ไขข้อความผิดพลาดให้เป็นภาษาไทย
    }
  };

  return (
    <div className="w-full space-y-4 max-w-lg px-[60px] py-[54px] bg-white rounded-3xl shadow-inner flex flex-col items-center">
      <LogoSection />
      <h1>Log in</h1>
      <div className="w-96 space-y-8 text-left">
        <FormInputField
          label="Email"
          id="email"
          type="text"
          placeholder="Enter your email"
          value={user_email}
          onChange={(e) => setEmail(e.target.value)} // ส่งค่าและฟังก์ชันการอัปเดต state
        />
        <FormInputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // ส่งค่าและฟังก์ชันการอัปเดต state
        />
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <button
            type="submit"
            style={{ background: "#8bc34a" }}
            className="w-full py-2 text-white text-base font-medium rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
