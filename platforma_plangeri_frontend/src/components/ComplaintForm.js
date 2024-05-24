import React, { useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaint = { title, description, location };

    axios.post('http://localhost:5000/api/complaints', complaint)
      .then(response => {
        console.log('Complaint submitted successfully:', response.data);
        setTitle('');
        setDescription('');
        setLocation('');
      })
      .catch(error => console.error('Error submitting complaint:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Complaint</button>
    </form>
  );
}

export default ComplaintForm;
