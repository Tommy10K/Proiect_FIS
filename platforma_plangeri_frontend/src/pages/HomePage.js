import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintList from '../components/ComplaintList';
import ComplaintForm from '../components/ComplaintForm';

function HomePage() {
  const [complaints, setComplaints] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRole(params.get('role'));

    axios.get('http://localhost:5000/api/complaints')
      .then(response => setComplaints(response.data))
      .catch(error => console.error('Eroare la preluarea plângerilor:', error));
  }, []);

  return (
    <div>
      <h1>Plângeri</h1>
      {role === 'citizen' && <ComplaintForm />}
      <ComplaintList complaints={complaints} />
    </div>
  );
}

export default HomePage;
