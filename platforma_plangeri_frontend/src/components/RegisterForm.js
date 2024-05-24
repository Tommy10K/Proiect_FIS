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
        console.log('Înregistrare reușită:', response.data);
      })
      .catch(error => console.error('Eroare la înregistrare:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nume:</label>
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
        <label>Parolă:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rol:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="citizen">Cetățean</option>
          <option value="primarie">Primărie</option>
        </select>
      </div>
      <button type="submit">Înregistrează-te</button>
    </form>
  );
}

export default RegisterForm;
