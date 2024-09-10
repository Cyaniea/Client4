// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UserProfile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        }
        setLoading(false);
      }
    }
    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'users', currentUser.uid), profile);
    alert('Profile updated successfully!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="displayName"
        value={profile.displayName || ''}
        onChange={handleChange}
        placeholder="Display Name"
      />
      <input
        type="text"
        name="phoneNumber"
        value={profile.phoneNumber || ''}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default UserProfile;