import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages-css/Home.css'; // Adjust the import path as per your project structure
import MedgptIcon from '../assets/Medgpt_icon.png';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <img src={MedgptIcon} alt="Medgpt Icon" className="icon" />
      <h2 className="large-text">MedChat</h2>
      <h2 className="small-text">Always On, Health Chatbot</h2>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/input')}>Start</button>
        <button className="button" onClick={() => navigate('/records')}>Records</button>
      </div>
    </div>
  );
}

export default Home;
