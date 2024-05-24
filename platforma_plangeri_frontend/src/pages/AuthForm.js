import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      axios.post('http://localhost:5000/api/users/login', { email, password })
        .then(response => {
          console.log('Autentificare reușită:', response.data);
          localStorage.setItem('token', response.data.token);
          const userRole = response.data.role === 'primarie' ? 'primarie' : 'citizen';
          window.location.href = `/home?role=${userRole}`;
        })
        .catch(error => console.error('Eroare la autentificare:', error));
    } else {
      axios.post('http://localhost:5000/api/users/register', { name, email, password, role })
        .then(response => {
          console.log('Înregistrare reușită:', response.data);
          localStorage.setItem('token', response.data.token);
          const userRole = response.data.role === 'primarie' ? 'primarie' : 'citizen';
          window.location.href = `/home?role=${userRole}`;
        })
        .catch(error => console.error('Eroare la înregistrare:', error));
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Logare' : 'Înregistrare'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Nume:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
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
        {!isLogin && (
          <div>
            <label>Rol:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Cetățean</option>
              <option value="primarie">Primărie</option>
            </select>
          </div>
        )}
        <button type="submit">{isLogin ? 'Loghează-te' : 'Înregistrează-te'}</button>
      </form>
      <button onClick={handleSwitch}>
        {isLogin ? 'Nu ai un cont? Înregistrează-te' : 'Ai deja un cont? Loghează-te'}
      </button>
    </div>
  );
}

export default AuthForm;
