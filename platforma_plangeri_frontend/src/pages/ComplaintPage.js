import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ComplaintPage.css';

function ComplaintPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Plângerea a fost preluată:', response.data);
        setComplaint(response.data);
      })
      .catch(error => console.error('Eroare la preluarea plângerii:', error));
    
    axios.get(`http://localhost:5000/api/complaints/${id}/comments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Comentariile au fost preluate:', response.data);
        setComments(response.data);
      })
      .catch(error => console.error('Eroare la preluarea comentariilor:', error));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`http://localhost:5000/api/complaints/${id}/comments`, { text: commentText }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Comentariul a fost adăugat:', response.data);
        setComments([...comments, response.data.comment]);
        setCommentText('');
      })
      .catch(error => console.error('Eroare la trimiterea comentariului:', error));
  };

  if (!complaint) {
    return <div>Se încarcă...</div>;
  }

  return (
    <div className="complaint-page">
      <h1>{complaint.title}</h1>
      <p><strong>Descriere:</strong> {complaint.description}</p>
      <p><strong>Locație:</strong> {complaint.location}</p>
      <p><strong>Stare:</strong> {complaint.status}</p>
      <p><strong>Utilizator:</strong> {complaint.posterName}</p>

      <h2>Comentarii</h2>
      <div className="comments-section">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="comment-item">
              <p><strong>{comment.user}:</strong> {comment.text}</p>
              <p><em>{new Date(comment.createdAt).toLocaleString()}</em></p>
            </div>
          ))
        ) : (
          <p>Niciun comentariu</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <div>
          <label>Adaugă un comentariu:</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Postează Comentariul</button>
      </form>
    </div>
  );
}

export default ComplaintPage;
