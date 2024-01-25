import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OngoingBills() {
  const [bills, setBills] = useState([]);
//hii ndo function ya ku GET data from backend.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/bills');
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
      <h1>Ongoing Bills</h1>
      {bills.map((bill) => (
        <Link to={`/bills/${bill.id}`} key={bill.id} className="ongoing-bills">
          <h2>{bill.title}</h2>
          <p>Affiliation: {bill.mp_affiliation}</p>
          <p>Description: {bill.description}</p>
          <p>Date: {bill.submission_date}</p>
          <p>Status: {bill.outcome_status}</p>
          <div>
            Upvotes: {bill.upvotes} | Downvotes: {bill.downvotes}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default OngoingBills;
