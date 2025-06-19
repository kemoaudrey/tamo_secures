import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import BASE_URL from '../config';
function ProfileManagement() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${BASE_URL}/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      toast.success('Profile updated successfully!');
      
      // Clear input fields
      setName('');
      setEmail('');

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <MDBInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <MDBInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <MDBBtn type="submit">Update Profile</MDBBtn>
    </form>
  );
}

export default ProfileManagement;