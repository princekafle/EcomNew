import React from 'react';

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <div>
      <h1>My Profile</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Password:</strong> {user.password}</p>

      
    </div>
  );
};

export default MyProfile;
