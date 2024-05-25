import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ComplaintPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => setComplaint(response.data))
      .catch(error => console.error('Eroare la preluarea plângerii:', error));
  }, [id]);

  if (!complaint) {
    return <div>Se încarcă...</div>;
  }

  return (
    <div className="complaint-page">
      <h1>{complaint.title}</h1>
      <p><strong>Descriere:</strong> {complaint.description}</p>
      <p><strong>Locație:</strong> {complaint.location}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Utilizator:</strong> {complaint.user && complaint.user.name ? complaint.user.name : 'Utilizator necunoscut'}</p>
    </div>
  );
}

export default ComplaintPage;