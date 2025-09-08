import React from "react";
import NavigationBar from "../common/nav-bar/NavigationBar";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 mt-10">
        <NavigationBar />
        <h2 className="text-center text-xl text-red-600">
          Please login to view your profile.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-10">
      <NavigationBar />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
         My Profile
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        
        
        <p><span className="font-semibold">Cart Items:</span> {user.cart.length}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
