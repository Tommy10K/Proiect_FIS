import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintList from '../components/ComplaintList';
import ComplaintForm from '../components/ComplaintForm';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [complaints, setComplaints] = useState([]);
  const [role, setRole] = useState('');
  const [view, setView] = useState('view');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const fetchComplaints = (status) => {
    const token = localStorage.getItem('token');
    const url = status ? `http://localhost:5000/api/complaints?status=${status}` : 'http://localhost:5000/api/complaints';
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setComplaints(response.data))
      .catch(error => console.error('Eroare la preluarea plângerilor:', error));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRole(params.get('role'));
    fetchComplaints(statusFilter);
  }, [statusFilter]);

  const handleViewChange = (view) => {
    setView(view);
    if (view === 'view') {
      fetchComplaints(statusFilter);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleMyComplaints = () => {
    navigate('/my-complaints');
  };

  return (
    <div className="home-container">
      <div className="content">
        <nav>
          <button onClick={() => handleViewChange('view')}>Vizualizează Plângeri</button>
          {role === 'citizen' && <button onClick={() => handleViewChange('create')}>Creează Plângere</button>}
          {role === 'citizen' && <button onClick={handleMyComplaints}>Plângerile Mele</button>}
        </nav>
        {view === 'view' && (
          <>
            <div className="filter-container">
              <label htmlFor="statusFilter">Filtrează după status:</label>
              <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="">Toate</option>
                <option value="nou">Nou</option>
                <option value="în derulare">În derulare</option>
                <option value="rezolvat">Rezolvat</option>
              </select>
            </div>
            <ComplaintList complaints={complaints} role={role} />
          </>
        )}
        {view === 'create' && <ComplaintForm updateComplaints={fetchComplaints} setView={setView} />}
      </div>
    </div>
  );
}

export default HomePage;
