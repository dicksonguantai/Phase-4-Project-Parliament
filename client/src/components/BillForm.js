import React, {useState} from 'react'

const BillForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    description: '', 
    affiliation: '',
    constituency: '',
  })

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form Data:', formData)
  }

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
        <label htmlFor="firstName">First Name:</label>
        <br />
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <br />
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          value={formData.description}
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
  )
}

export default BillForm
//nimebakisha logic ya kuhandle data ya backend