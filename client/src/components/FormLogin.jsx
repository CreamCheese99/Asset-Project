import React, { useState } from 'react';
import InputField from './InputField'; 
import LogoSection from './LogoSection';

function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    if (!username || !password) {
      setError('Please fill in both username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 max-w-lg px-[60px] py-[54px] bg-white rounded-3xl shadow-inner flex flex-col items-center">
      <LogoSection />
      <h1>เข้าสู่ระบบ</h1>
      
      <form className="w-96 space-y-8 text-left" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          style={{ background: '#8bc34a' }}
          className="w-full py-2 text-white text-base font-medium rounded-lg hover:bg-gray-300 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default FormLogin;
