import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavBar from './NavBar';

function BillDetails ()  {
  const { id } = useParams();
  const [bill, setBill] = useState({});
  const [userRole, setUserRole] = useState('user');
  const [hasVoted, setHasVoted] = useState(false);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {

    fetch('/check_session')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching user role');
        }
      })
      .then((data) => {
        setUserRole(data.role || 'user');
      })
      .catch((error) => console.error(error));

      console.log('ID', id)
    fetch(`/bills/${id}`)
      .then((r) => {
        if (r.ok) {
          console.log(r.json)
          return r.json();
        } else {
          throw new Error("Error fetching bill details");
        }
      })
      .then(setBill)
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleVote = async (voteType) => {
    if (hasVoted) {
      alert('You have already voted.');
      console.log('User has already voted');
      return;
    }
    try {
      const response = await fetch(`/bills/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [`${voteType}s`]: true,
        }),
      });

      if (response.ok) {
      const data = await response.json();
      console.log('Vote Response:', data);

      setBill((prevDetails) => ({
        ...prevDetails,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        outcome_status: data.outcome_status,
      }));

      setHasVoted(true);

      alert('Your vote has been recorded.');
    } else {
      console.error('Error during voting:', response.statusText);
    }
  }catch (error) {
    console.error('Error during voting:', error);
  }
};


  if (!bill) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="bill-details-container">
        <h2>{bill.title}</h2>
        <p>Description:{bill.description}</p>
        <p>Date: {formatDate(bill.submission_date)}</p>
        <p>{bill.outcome_status}</p>
        <p>{bill.upvotes}</p>
        <p>{bill.downvotes}</p>
        {userRole === 'mp' && (
          <div>
          <button type="button" onClick={() => handleVote('upvote')} disabled={hasVoted}>
            Upvote
          </button>
          <button type="button" onClick={() => handleVote('downvote')} disabled={hasVoted}>
            Downvote
          </button>
        </div>
        )}

        {userRole !== 'mp' && <p>You can only view the details.</p>}

      </div>
    </div>
  );
};


export default BillDetails;