import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory o'rniga useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useHistory o'rniga useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Foydalanuvchi login ma'lumotlari
    const validEmail = 'Diyorbek2226@gmail.com';
    const validPassword = 'Diyorbek0502';

    if (email === validEmail && password === validPassword) {
      navigate('/home'); // Home sahifasiga yo'naltirish (history.push o'rniga navigate)
    } else {
      setErrorMessage('Email yoki parol noto‘g‘ri.'); 
      navigate('/')// Xato xabari
    }
  };

  return (
    <div className='flex items-center justify-center pt-12 pb-12 ps-12 pe-12 font-mono'>
        <div style={{boxShadow:"5px 5px 10px 10px black ", borderRadius:"12px", backgroundColor:"darkgray"}} className='w-[400px]   bg-slate-400 pt-12 pb-12 ps-12 pe-12 '>
      <h2 className='text-3xl font-mono text-yellow-50 font-medium text-center'>Kirish</h2>
      <form onSubmit={handleSubmit}>
      <div className='mt-4 mb-4 '>
      <input
       className='w-full pt-2 pb-2 text-center rounded-md'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='mt-4 mb-4 w-full '>
        <input className='w-full pt-2 pb-2 text-center rounded-md' type="password" placeholder="Password"value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /></div>
        
     <div className='text-center'>
     <button style={{borderRadius:"8px", }} className='pb-2 pt-2 ps-6 pe-6 bg-blue-500 text-white  ' type="submit">Kirish</button>
     </div>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
