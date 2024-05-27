import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import { ProfileCard } from '../Profile/ProfileCard';
import { Navbar } from '../Profile/Navbar';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setError('Failed to fetch profile information. Please try again.');
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#fafafb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center px-5 pb-2 sm:p-0">
        <div className="w-full sm:flex sm:flex-col sm:items-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-normal">Personal info</h1>
            <p className="text-sm font-light">
              Basic info, like your name and photo
            </p>
          </div>
          {profile && <ProfileCard profile={profile} />}
        </div>
      </div>
    </div>
  );
};
