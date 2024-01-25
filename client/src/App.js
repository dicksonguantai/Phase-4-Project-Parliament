// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import NavBar from './components/NavBar';
import BillForm from './components/BillForm';
import BillDetails from './components/BillDetails';
import OngoingBills from './components/OngoingBills';


function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<LoginForm/>}/>
        <Route path="/bill-proposal-form" element={<BillForm/>}/>
        <Route path="/ongoing-bills" element={<OngoingBills/>}/>
        <Route path="/bills/:bill_Id" element={<BillDetails/>}/>
      </Routes>
    </Router>
  );
}


export default App;
