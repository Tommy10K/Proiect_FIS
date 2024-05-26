import React, { useState } from 'react';
import axios from 'axios';
import cities from '../pages/cities';
import './ComplaintForm.css';

function ComplaintForm({ updateComplaints, setView }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/complaints', { title, description, location, city }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Complaint created:', response.data);
        updateComplaints();
        setView('view');
      })
      .catch(error => console.error('Error creating complaint:', error));
  };

  return (
    <div className="complaint-form-container">
      <h1>Creează o plângere</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titlu:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descriere:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Locație:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Oraș:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Alege orașul</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <button type="submit">Trimite Plângerea</button>
      </form>
    </div>
  );
}

export default ComplaintForm;