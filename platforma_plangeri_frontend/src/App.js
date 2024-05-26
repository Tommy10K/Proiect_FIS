import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthForm from './pages/AuthForm';
import ComplaintPage from './pages/ComplaintPage';
import ComplaintForm from './components/ComplaintForm';
import MyComplaintsPage from './pages/MyComplaintsPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Platformă de Plângeri</h1>
        </header>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/complaint/:id" element={<ComplaintPage />} />
          <Route path="/complaintform" element={<ComplaintForm />} />
          <Route path="/my-complaints" element={<MyComplaintsPage />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
