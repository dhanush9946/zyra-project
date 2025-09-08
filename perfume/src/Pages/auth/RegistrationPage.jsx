import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function RegistrationPage() {

  const navigate = useNavigate();

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');


  const handleRegister = (e)=>{
    e.preventDefault();

    if(name.trim() === ''){
      return alert('Name is requred');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.match(emailRegex)){
      return alert('Email is invalid');
    }

    if(password<6){
      return alert('Password must be atleast 6 characters');
    }

    if(confirmPassword != password){
      return alert('Passwords do not match')
    }

    const userData = {name,email,password,confirmPassword,cart:[],wishList:[],};

    axios
    .post('http://localhost:3000/users',userData)

       navigate('/login')
  }

return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
  <form 
    onSubmit={handleRegister}
    className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Create an Account</h2>

    {/* Name */}
    <div className="mb-4">

      <label className="block text-gray-700 font-medium mb-2">Name</label>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter your name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
    </div>

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
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Password</label>
      <input
        type="password"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter your password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
    </div>

    {/* Confirm Password */}
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
      <input
        type="password"
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
    >
      Register
    </button>

    {/* Already have an account */}
    <p className="text-center text-gray-600 mt-4">
      Already have an account?{" "}
      <a href="/login" className="text-indigo-600 font-semibold hover:underline">
        Login
      </a>
    </p>
  </form>
</div>

  )
}

export default RegistrationPage