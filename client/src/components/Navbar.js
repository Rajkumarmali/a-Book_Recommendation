import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the menu is open or closed
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen); // Toggle the state when the button is clicked
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">Books</Link>
        <button className="navbar-toggler" type="button" onClick={handleToggle}   >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              {/* <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link> */}
            </li>
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="signup">SignUp</Link>
            </div>
          ) : (
            <div>
              <div className='btn bg-white text-success mx-2' onClick={handleLogout}>LogOut</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
