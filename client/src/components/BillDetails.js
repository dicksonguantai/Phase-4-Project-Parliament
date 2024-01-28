import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function BillDetails ()  {
  const { bill_id } = useParams();
  const [billDetails, setBillDetails] = useState({});
  const [userRole, setUserRole] = useState('user');

  useEffect(() => {

    fetch('/check_session')
    .then((response) => response.json())
    .then((data) => {
      setUserRole(data.role);
    })
    .catch((error) => console.error(error));


    fetch(`/bills/${bill_id}`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Error fetching bill details");
        }
      })
      .then(setBillDetails)
      .catch((error) => {
        console.error(error);
      });
  }, [bill_id]);


  if (!billDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bill-details-container">
      <h2>{billDetails.title}</h2>
      <p>Description:{billDetails.description}</p>
      <p>Date: {billDetails.date}</p>
      <p>{billDetails.outcome_status}</p>
      <p>{billDetails.up_votes}</p>
      <p>{billDetails.down_votes}</p>
      {userRole === 'mp' && (
        <button type="button" onClick={handleVote}>
          Vote
        </button>
      )}

      {userRole !== 'mp' && <p>You can only view the details.</p>}

    </div>
  );
};

export default BillDetails;