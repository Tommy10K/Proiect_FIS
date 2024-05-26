import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ComplaintList.css';

function ComplaintList({ complaints }) {
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
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
