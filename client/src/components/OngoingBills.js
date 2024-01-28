import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OngoingBills() {
  const [bills, setBills] = useState([]);
//hii ndo function ya ku GET data from backend.
  useEffect(() => {
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
      <h1>Ongoing Bills</h1>
      {bills.map((bill) => (
        <Link to={`/bills/${bill.id}`} key={bill.title} className="ongoing-bills">
          <h2>{bill.title}</h2>
          <p>Sponsor: {bill.mp_first_name} {bill.mp_last_name}</p>
          <p>Affiliation: {bill.mp_affiliation}</p>
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
