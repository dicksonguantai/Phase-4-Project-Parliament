import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BillDetails ({ match })  {
  const [billDetails, setBillDetails] = useState(null);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await fetch(`https://api.example.com/bills/${match.params.bill_Id}`);
        const data = await response.json();
        setBillDetails(data);
      } catch (error) {
        console.error('Error fetching bill details:', error);
      }
    };

    fetchBillDetails();
  }, [match.params.bill_Id]);

  if (!billDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bill-details-container">
      <h2>{billDetails.title}</h2>
      <p>{billDetails.description}</p>
      <p>Date: {billDetails.date}</p>
      <p>{billDetails.outcome_status}</p>
      <p>{billDetails.up_votes}</p>
      <p>{billDetails.down_votes}</p>


    </div>
  );
};

export default BillDetails;