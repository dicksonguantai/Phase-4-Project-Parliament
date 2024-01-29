import React, { useEffect, useState } from 'react';

const BillForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    description: '',
    affiliation: '',
    constituency: '',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/check_session')
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
          console.log('Session active for:', data.email);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log('Error fetching user role:', error.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          mp_first_name: formData.firstName,
          mp_last_name: formData.lastName,
          mp_affiliation: formData.affiliation,
          mp_constituency: formData.constituency,
        }),
      });

      if (response.ok) {
        console.log('Bill submitted successfully');
        setFormData({
          title: '',
          firstName: '',
          lastName: '',
          description: '',
          affiliation: '',
          constituency: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to submit bill:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Bill Proposal Form</h2>
      {user && <p>Welcome, {user.first_name}!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="affiliation">MP Affiliation:</label>
          <br />
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="constituency">MP Constituency:</label>
          <br />
          <input
            type="text"
            id="constituency"
            name="constituency"
            value={formData.constituency}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BillForm;
