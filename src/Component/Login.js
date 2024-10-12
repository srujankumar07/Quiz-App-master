import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Hardcoded admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'admin';

    if (username === adminUsername && password === adminPassword) {
      onLogin(true);
    } else {
      setErrorMessage('Invalid credentials! Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className='input-fields'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className='input-fields'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button className='login-button' onClick={handleLogin}>Login</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
