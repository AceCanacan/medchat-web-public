// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import InputPage from './pages/input';
import Home from './pages/Home'; 
import ChatPage from './pages/ChatPage';
import OutputPage from './pages/OutputPage'; // Import the OutputPage component


function App() {
  return (
    <div className="App">
      <Router>
        <AnimationApp />
      </Router>
    </div>
  );
}

function AnimationApp() {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/outputpage" element={<OutputPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
