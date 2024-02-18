import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {

  const [creatUser, setCreateUser] = useState({ name: "", email: "", password: "", geolocation: "" })
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: creatUser.name, email: creatUser.email, password: creatUser.password, location: creatUser.geolocation }),
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);



      if (!json.success) {
        alert('Enter valid Creatials')
      }
      if (json.success) {
        navigate('/login')
      }
      // Handle the response or log success
      console.log("Request was successful");
    } catch (error) {
      console.error("Data are not send");
      alert('Enter valid Creatials')
    }
  };




  const onChange = (e) => {
    setCreateUser({ ...creatUser, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>

        <div className="m-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={creatUser.name} onChange={onChange} aria-describedby="emailHelp" />
        </div>

        <div className="m-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={creatUser.email} onChange={onChange} aria-describedby="emailHelp" />
        </div>

        <div className="m-3">
          <label htmlFor="address" className="form-label">Address</label>
          <fieldset>
            <input type="text" className="form-control" name='geolocation' value={creatUser.geolocation} onChange={onChange} aria-describedby="emailHelp" />
          </fieldset>
        </div>
        <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={creatUser.password} onChange={onChange} name='password' />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
      </form>
    </div>
  );
}

export default Signup;
