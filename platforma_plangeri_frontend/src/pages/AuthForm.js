import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuthForm.css';
import cities from './cities';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');
  const [availableCities, setAvailableCities] = useState(cities);

  useEffect(() => {
    if (role === 'primarie') {
      axios.get('http://localhost:5000/api/users/usedCities')
        .then(response => {
          const usedCities = response.data;
          setAvailableCities(cities.filter(city => !usedCities.includes(city)));
        })
        .catch(error => console.error('Eroarea la preluarea oraselor:', error));
    }
  }, [role]);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      axios.post('http://localhost:5000/api/users/login', { email, password })
        .then(response => {
          console.log('Logare cu succes:', response.data);
          localStorage.setItem('token', response.data.token); // Store the token
          const userRole = response.data.role === 'primarie' ? 'primarie' : 'citizen';
          window.location.href = `/home?role=${userRole}`;
        })
        .catch(error => console.error('Login error:', error));
    } else {
      axios.post('http://localhost:5000/api/users/register', { name, email, password, role })
        .then(response => {
          console.log('Inregistrare cu succes:', response.data);
          localStorage.setItem('token', response.data.token); // Store the token
          const userRole = response.data.role === 'primarie' ? 'primarie' : 'citizen';
          window.location.href = `/home?role=${userRole}`;
        })
        .catch(error => console.error('Eroare la inregistrare:', error));
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name:</label>
            {role === 'primarie' ? (
              <select value={name} onChange={(e) => setName(e.target.value)} required>
                <option value="">Select city</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="primarie">Primarie</option>
            </select>
          </div>
        )}
        <button type="submit">{isLogin ? 'Loghează- te' : 'Înregistrare'}</button>
      </form>
      <button onClick={handleSwitch}>
        {isLogin ? 'Nu ai cont? Înregistrează- te' : 'Ai deja cont? Loghează- te'}
      </button>
    </div>
  );
}

export default AuthForm;
