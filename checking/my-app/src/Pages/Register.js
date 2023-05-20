import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/register', { username, password,confirm_password });
      alert('User registered successfully!');
      setUsername('');
      setPassword('');
      setConfirm_password('');
    } catch (error) {
      console.error(error);
      alert('An error occurred while registering user.');
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <br />
      <label>
        Confirm Password:
        <input type="password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} />
      </label>
      <br />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;