import React from 'react';

function ComplaintList({ complaints }) {
  return (
    <div>
      {complaints.map(complaint => (
        <div key={complaint._id}>
          <h2>{complaint.title}</h2>
          <p>{complaint.description}</p>
          <p>Status: {complaint.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
