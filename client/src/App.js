// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<LoginForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
