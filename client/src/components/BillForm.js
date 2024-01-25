import React, { useState } from 'react';

const BillForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    mpName: '',
    billText: '',
    affiliation: '',
    constituency: '', // nimeadd field ya constituency
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <h2>Bill Proposal Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="mpName">Mp Name:</label>
        <br />
        <input
          type="text"
          id="mpName"
          name="mpName"
          value={formData.mpName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="billText">Bill Text:</label>
        <br />
        <textarea
          id="billText"
          name="billText"
          value={formData.billText}
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="affiliation">Mp Affiliation:</label>
        <br />
        <input
          type="text"
          id="affiliation"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="constituency">Mp Constituency:</label>
        <br />
        <input
          type="text"
          id="constituency"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default BillForm;
