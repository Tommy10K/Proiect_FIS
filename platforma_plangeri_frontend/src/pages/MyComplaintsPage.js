import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintList from '../components/ComplaintList';
import './MyComplaintsPage.css';

function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [userName, setUserName] = useState('');

  const fetchMyComplaints = () => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/complaints/my-complaints', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Complaints fetched:', response.data);
        setComplaints(response.data);
      })
      .catch(error => console.error('Eroare la preluarea plângerilor mele:', error));
  };

  const fetchUserInfo = () => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('User info fetched:', response.data);
        setUserName(response.data?.name || '');
      })
      .catch(error => console.error('Eroare la preluarea informațiilor utilizatorului:', error));
  };

  useEffect(() => {
    fetchUserInfo();
    fetchMyComplaints();
  }, []);

  useEffect(() => {
    console.log('User:', userName);
    console.log('Complaints:', complaints);
  }, [userName, complaints]);

  return (
    <div className="my-complaints-container">
      <h1>Plângerile Mele</h1>
      {userName ? (
        <ComplaintList complaints={complaints.filter(complaint => complaint.posterName === userName)} />
      ) : (
        <p>Se încarcă...</p>
      )}
    </div>
  );
}

export default MyComplaintsPage;
