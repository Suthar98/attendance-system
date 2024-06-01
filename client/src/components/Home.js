import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Welcome Home</h2>
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
