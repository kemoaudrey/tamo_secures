import React from "react";
import { Link } from "react-router-dom";
import "../navbar/Navbar.css";
import 'mdb-ui-kit/css/mdb.min.css';
import { useNavigate } from 'react-router-dom';


function Navbar({ superadminName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to the login page
  };
    return (
      <header className="header">
        <div class="logo">
        <Link to="/super/admin/dashboard"><img
        alt="Logo"
        // height="100"
        src="/assets/logo AFC.jpg"
        // width="200px"
      /></Link>
        
        </div>
        <div class="header-icons">
          {/* <div class="search_box">
            <input type="text" placeholder="Search EasyPay"/>
            <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
          </div> */}
          <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </header>
    );
  }

  export default Navbar;

  // How can I implement AI-driven predictive analytics for blood pressure monitoring in React
  // What are the best libraries for visualizing real-time health data in React