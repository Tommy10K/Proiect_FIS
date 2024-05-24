import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintList from '../components/ComplaintList';
import ComplaintForm from '../components/ComplaintForm';
import './HomePage.css';

function HomePage() {
  const [complaints, setComplaints] = useState([]);
  const [role, setRole] = useState('');
  const [view, setView] = useState('view');

  const fetchComplaints = () => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/complaints', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => setComplaints(response.data))
      .catch(error => console.error('Eroare la preluarea plângerilor:', error));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRole(params.get('role'));
    fetchComplaints();
  }, []);

  const handleViewChange = (view) => {
    setView(view);
    if (view === 'view') {
      fetchComplaints();
    }
  };

  return (
    <div className="home-container">
      <h1>Plângeri</h1>
      <nav>
        <button onClick={() => handleViewChange('view')}>Vizualizează Plângeri</button>
        {role === 'citizen' && <button onClick={() => handleViewChange('create')}>Creează Plângere</button>}
      </nav>
      {view === 'view' && <ComplaintList complaints={complaints} role={role} updateComplaints={fetchComplaints} />}
      {view === 'create' && <ComplaintForm updateComplaints={fetchComplaints} setView={setView} />}
    </div>
  );
}

export default HomePage;