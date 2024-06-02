import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import { toast } from 'react-toastify';
import backgroundImage from '../assets/images/image1.jpg';
import Logo from '../assets/images/image2.jpg'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // state for password visibility
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      authService.login(response.data.token);
      navigate('/');
      toast.success("Login Sucessful");

    } catch (err) {
      setError('Invalid username or password');
      toast.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      className="log__wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container1 mt-5">
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder='Enter user name'
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-outline-primary btn-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;