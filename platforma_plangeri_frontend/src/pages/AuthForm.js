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
        .catch(error => console.error('Eroare la preluarea oraselor:', error));
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
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role); 
          const userRole = response.data.role === 'primarie' ? 'primarie' : 'citizen';
          window.location.href = `/home?role=${userRole}`;
        })
        .catch(error => console.error('Login error:', error));
    } else {
      axios.post('http://localhost:5000/api/users/register', { name, email, password, role })
        .then(response => {
          console.log('Înregistrare cu succes:', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role); 
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
            {role === 'primarie' ? (
              <select value={name} onChange={(e) => setName(e.target.value)} required>
                <option value="">Alege orașul</option>
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
        <button type="submit">{isLogin ? 'Loghează-te' : 'Înregistrare'}</button>
      </form>
      <button onClick={handleSwitch}>
        {isLogin ? 'Nu ai cont? Înregistrează-te' : 'Ai deja cont? Loghează-te'}
      </button>
    </div>
  );
}

export default AuthForm;
