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
        console.log('Complaint fetched:', response.data);
        setComplaint(response.data);
        setComments(response.data.comments);
      })
      .catch(error => console.error('Error fetching complaint:', error));
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
        console.log('Comment added:', response.data);
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
      <p><strong>Descriere:</strong> {complaint.description}</p>
      <p><strong>Locație:</strong> {complaint.location}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Utilizator:</strong> {complaint.posterName}</p>

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
          <p>Niciun comentariu încă.</p>
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
