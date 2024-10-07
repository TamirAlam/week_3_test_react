import React from 'react'
import '../../componentsCSS/Navbar/Navbar.css';
import { useNavigate } from "react-router-dom";
  
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
    <div className="navbar">
        <h3>Interactive User Interface for Adding and Retrieving Data</h3>
      </div>
      <div className="navigators">
        <button className="navigator-btn" onClick={() => navigate("/")}>
          Add New Person
        </button>
        <button className="navigator-btn" onClick={() => navigate("/retrieve")}>
          Retrieve Infromation
        </button>
      </div>
      </>
  )
}

export default Navbar
