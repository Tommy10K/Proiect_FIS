import React, { useState } from 'react';
import axios from 'axios';

function ComplaintForm({ updateComplaints, setView }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaint = { title, description, location };
    const token = localStorage.getItem('token');

    axios.post('http://localhost:5000/api/complaints', complaint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Plângerea a fost trimisă cu succes:', response.data);
        setTitle('');
        setDescription('');
        setLocation('');
        updateComplaints();
        setView('view');
      })
      .catch(error => console.error('Eroare la trimiterea plângerii:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="complaint-form">
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
      <button type="submit">Trimite Plângerea</button>
    </form>
  );
}

export default ComplaintForm;
