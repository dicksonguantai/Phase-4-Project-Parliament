import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function OngoingBills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch('/check_session')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Error fetching user role');
        }
      });

    const fetchData = async () => {
      try {
        const response = await fetch('/bills');
        if (response.ok) {
          const data = await response.json();
          setBills(data.bills);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <NavBar />
      <h1>Ongoing Bills</h1>
      <div className="ongoing-bills-container">
        {bills.map((bill) => (
          <Link to={`/bills/${bill.id}`} key={bill.id} className="ongoing-bills">
            <h2>{bill.title}</h2>
            <p>By: {bill.mp_first_name} {bill.mp_last_name}</p>
            <p>Affiliation: {bill.mp_affiliation}</p>
            <p>Status: {bill.outcomestatus ? 'passed' : 'failed'}</p>
            <div>
              Upvotes: {bill.upvotes} | Downvotes: {bill.downvotes}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OngoingBills;