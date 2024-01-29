// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BillForm from './components/BillForm';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import BillDetails from './components/BillDetails';
import OngoingBills from './components/OngoingBills';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<SigninForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/bill-proposal-form" element={<BillForm/>}/>
        <Route path="/ongoing-bills" element={<OngoingBills/>}/>
        <Route path="/bills/:id" element={<BillDetails/>}/>
      </Routes>
    </Router>
  );
}


export default App;
