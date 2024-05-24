import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/register', { name, email, password, role })
      .then(response => {
        console.log('Registered successfully:', response.data);
      })
      .catch(error => console.error('Error registering:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="citizen">Citizen</option>
          <option value="town hall">Town Hall</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
