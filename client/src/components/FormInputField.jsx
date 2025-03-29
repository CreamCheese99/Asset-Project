
import React from 'react';

function InputField({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="w-auto">
      <label className="block text-[#333333] text-base mb-2" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value} 
        onChange={onChange} 
        className="w-full h-10 px-3.5 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
