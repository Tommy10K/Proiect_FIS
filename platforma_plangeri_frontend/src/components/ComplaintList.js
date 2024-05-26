import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ComplaintList.css';

function ComplaintList({ complaints, role, updateComplaints }) {
  useEffect(() => {
    console.log(complaints);
  }, [complaints]);

  const sortedComplaints = complaints.sort((a, b) => {
    const statusOrder = {
      'nou': 1,
      'în derulare': 2,
      'rezolvat': 3,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Complaint deleted:', response.data);
        updateComplaints();
      })
      .catch(error => console.error('Error deleting complaint:', error));
  };

  return (
    <div className="complaint-list">
      {sortedComplaints.map((complaint) => (
        <div key={complaint._id} className="complaint-item">
          <h3>
            <Link to={`/complaint/${complaint._id}`}>{complaint.title}</Link>
          </h3>
          <p>
            <strong>Oraș:</strong> {complaint.city}
          </p>
          <p>
            <strong>Locație:</strong> {complaint.location}
          </p>
          <p>
            <strong>Status:</strong> {complaint.status}
          </p>
          <p>
            <strong>Utilizator:</strong> {complaint.posterName ? complaint.posterName : 'Utilizator necunoscut'}
          </p>
          {role === 'primarie' && (
            <button onClick={() => handleDelete(complaint._id)}>Șterge</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
