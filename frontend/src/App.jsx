import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './components/Auth/RegisterForm';
import { Login } from './components/Auth/LoginForm';
import { ProfilePage } from './components/Pages/ProfilePage';
import { EditProfilePage } from './components/Pages/EditProfilePage';
import { SessionTimeout } from './utils/SessionTimeout'


const App = () => {
  return (
    <Router>
      <SessionTimeout />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/update' element={<EditProfilePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
