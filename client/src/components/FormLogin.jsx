import React from 'react'
import FormInputField from './FormInputField'
import LogoSection from './LogoSection'

function FormLogin() {
  return (
    <div className="w-full space-y-4 max-w-lg px-[60px] py-[54px] bg-white rounded-3xl shadow-inner flex flex-col items-center">
    <LogoSection />
    <h1>เข้าสู่ระบบ</h1>
    <div className="w-96 space-y-8 text-left">

      <FormInputField label="Username" id="username" type="text" placeholder="Enter your username" />
      <FormInputField label="Password" id="password" type="password" placeholder="Enter your password" />
      <button style={{ background: '#8bc34a'}} className="w-full py-2  text-white text-base font-medium rounded-lg hover:bg-gray-300 transition duration-200">
        Login
      </button>
    </div>
  </div>
  )
}

export default FormLogin;