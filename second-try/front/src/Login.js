import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/login', { username, password });
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      alert('Invalid username or password!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      
      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
}

export default Login;