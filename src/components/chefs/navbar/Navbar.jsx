import React, { useState, useEffect,useCallback } from "react";
import "../navbar/Navbar.css";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useParams
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../config.js';
function Navbar() {
  const navigate = useNavigate();
  const [enterprise, setEnterprise] = useState({});
  const { enterpriseId , departmentId, chefId} = useParams(); // Use enterprise ID from the URL params
 

  const fetchEnterpriseData = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/enterprises/${enterpriseId}`
      );
      if (!response.ok) throw new Error("Failed to fetch enterprise data");

      const data = await response.json();
      setEnterprise(data); // Set the enterprise data received from the backend
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, [enterpriseId]);

  useEffect(() => {
    fetchEnterpriseData(); // Fetch enterprise data on component mount
  }, [fetchEnterpriseData]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to the login page
  };
  return (
    <header className="header">
      <div className="logo">
        {enterprise && (
          <img
            src={`/Images/${enterprise.image}`}
            alt={enterprise.enterprise_name}
            style={{ width: "150px", height: "150px" }}
          />
        )}
        <Link
              className="active"
              to={`/enterprise/${enterpriseId}/department/${departmentId}/chef/${chefId}/dashboard?${enterprise.enterprise_name}`}
              >
              {/* <i className="fas fa-tachometer-alt"></i> */}
              Dashboard
            </Link>
      </div>
      <div class="header-icons">
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
