import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1); // 1 = check email, 2 = reset password

  const emailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://database-1-p36v.onrender.com/users?email=${email}`);
      if (res.data.length > 0) {
        setUserId(res.data[0].id);
        setStep(2);
      } else {
        alert("No user found with this email!");
      }
    } catch (error) {
      console.error("Error finding user", error);
    }
  };

  const passwordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.patch(`https://database-1-p36v.onrender.com/users/${userId}`, {
        password: newPassword,
      });
      alert("Password reset successful! Please login with new password.");
      setStep(1);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error resetting password", error);
    }
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md mb-42 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      {step === 1 ? (
        <form onSubmit={emailSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={passwordReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
