import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintList from '../components/ComplaintList';
import ComplaintForm from '../components/ComplaintForm';

function HomePage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/complaints') 
      .then(response => setComplaints(response.data))
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  return (
    <div>
      <h1>Complaints</h1>
      <ComplaintForm />
      <ComplaintList complaints={complaints} />
    </div>
  );
}

export default HomePage;
