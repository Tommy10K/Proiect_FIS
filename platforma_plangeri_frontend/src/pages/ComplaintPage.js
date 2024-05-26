import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ComplaintPage.css';

function ComplaintPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    console.log("User Role:", userRole); 
    setRole(userRole);

    axios.get(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setComplaint(response.data);
        setComments(response.data.comments);
      })
      .catch(error => console.error('Error fetching complaint:', error));
  }, [id]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:5000/api/complaints/${id}`, { status: newStatus }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setComplaint(response.data.complaint);
      })
      .catch(error => console.error('Error updating status:', error));
  };

  const handleDeleteComplaint = () => {
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/home');
      })
      .catch(error => console.error('Error deleting complaint:', error));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`http://localhost:5000/api/complaints/${id}/comments`, { text: commentText }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setComments([...comments, response.data.comment]);
        setCommentText('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  if (!complaint) {
    return <div>Se încarcă...</div>;
  }

  return (
    <div className="complaint-page">
      <h1>{complaint.title}</h1>
      <p><strong>Oraș:</strong> {complaint.city}</p>
      <p><strong>Locație:</strong> {complaint.location}</p>
      <p><strong>Descriere:</strong> {complaint.description}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Utilizator:</strong> {complaint.posterName ? complaint.posterName : 'Utilizator necunoscut'}</p>
      <p><em>{new Date(complaint.createdAt).toLocaleString('ro-RO')}</em></p>

      {role === 'primarie' && (
        <div className="status-change-container">
          <label>Schimba Status:</label>
          <select onChange={handleStatusChange} value={complaint.status}>
            <option value="nou">Nou</option>
            <option value="în derulare">În Derulare</option>
            <option value="rezolvat">Rezolvat</option>
          </select>
          <button onClick={handleDeleteComplaint} className="delete-button">Șterge Plângerea</button>
        </div>
      )}

      <h2>Comentarii</h2>
      <div className="comments-section">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="comment-item">
              <p><strong>{comment.user}:</strong> {comment.text}</p>
              <p><em>{new Date(comment.createdAt).toLocaleString('ro-RO')}</em></p>
            </div>
          ))
        ) : (
          <p>Fără comentarii momentan</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <div>
          <label>Adăugați un comentariu:</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Trimite comentariul</button>
      </form>
    </div>
  );
}

export default ComplaintPage;
