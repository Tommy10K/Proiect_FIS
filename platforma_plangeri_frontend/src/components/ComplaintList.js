import React, { useEffect } from 'react';
import './ComplaintList.css';

function ComplaintList({ complaints, role, updateComplaints }) {
  useEffect(() => {
    console.log(complaints);
  }, [complaints]);

  return (
    <div className="complaint-list">
      {complaints.map(complaint => (
        <div key={complaint._id} className="complaint-item">
          <h3>{complaint.title}</h3>
          <p><strong>Descriere:</strong> {complaint.description}</p>
          <p><strong>Locație:</strong> {complaint.location}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <p><strong>Utilizator:</strong> {complaint.user && complaint.user.name ? complaint.user.name : 'Utilizator necunoscut'}</p>
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
