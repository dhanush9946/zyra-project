import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function LoginPage() {

  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();
  try{
    const response =  await axios.get('http://localhost:3000/users');
    const users =  response.data;
    
    const user = users.find((u)=> u.email === email && u.password === password);
    if(user){
     navigate('/')
   
     localStorage.setItem("user",JSON.stringify(user));
    }
    else{
      setError('Invalid email or password');
    }
  }
  catch(err){
    console.log('Login error',err);
    setError('Failed to login.please try again later.')
    
  }
  
  }

  return (
   

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
  <form onSubmit={handleLogin}
     className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login to Zyra</h2>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Email</label>
      <input
        type="email"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter your email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">Password</label>
      <input
        type="password"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter your password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
    </div>
    {error && <p>{error}</p>}

    {/* Button */}
    <button
      type="submit"
      className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
    >
      Login
    </button>

    {/* Extra Links */}
    <p className="text-center text-gray-600 mt-4">
      Don’t have an account?{" "}
      <a href="/register" className="text-indigo-600 font-semibold hover:underline">
        Register
      </a>
    </p>

    <p className="text-center mt-2">
      <a href="/forgetPassword" className="text-sm text-indigo-500 hover:underline">
        Forgot Password?
      </a>
    </p>
  </form>
</div>

  )
}

export default LoginPage