import React, { useEffect, useState, useCallback } from "react";
import "./AdminDashboard.css";
import Navbar from "../admins/navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom"; // Import Link
import { FcDepartment } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import BASE_URL from '../config';
function AdminDashboard() {
  const [count, setCount] = useState({ admin: 0, department: 0, chef_department: 0, employees: 0 });
  const [adminName, setAdminName] = useState("");
  const { enterpriseId } = useParams(); // Use enterprise ID from the URL params
  const [enterprise, setEnterprise] = useState(null); // Changed to null for better checks

  const fetchEnterpriseData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enterprises/${enterpriseId}`);
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

  const fetchAdminInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/admin/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch admin info");

      const data = await response.json();
      setAdminName(data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCount = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/count?enterprise_id=${enterpriseId}`);
      if (!response.ok) throw new Error("Failed to fetch counts");

      const data = await response.json();
      setCount(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, [enterpriseId]);

  useEffect(() => {
    fetchCount();
    fetchAdminInfo();
  }, [fetchCount]);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar enterprise={enterprise} />
        <div className="content">
          {enterprise && <h2>Dashboard / {enterprise.enterprise_name}</h2>}

          <div className="welcome-card">
            <h1>Welcome {adminName}</h1>
            <span>VCARD MANAGEMENT SYSTEM.</span>
          </div>

          <div className="main-cards">
          <Link to={`/enterprise/${enterpriseId}/super/admin/admins`} className="cards">
              <div className="card-inner">
                <h3>ADMINS</h3>
                <RiAdminFill className="card_icon" />
              </div>
              <h1>{count.admin}</h1>
            </Link>
            <Link to={`/enterprise/${enterpriseId}/departments`} className="cards">
              <div className="card-inner">
                <h3>DEPARTMENTS</h3>
                <FcDepartment className="card_icon" />
              </div>
              <h1>{count.department}</h1>
            </Link>
            <Link to={`/enterprise/${enterpriseId}/chefs`} className="cards">
              <div className="card-inner">
                <h3>CHIEF OF DEPARTMENTS</h3>
                <GrUserAdmin className="card_icon" />
              </div>
              <h1>{count.chef_department}</h1>
            </Link>
            <div className="cards">
                             {/* <Link to={`/enterprise/${enterpriseId}/employee-list`} className="cards"> */}
              <div className="card-inner">
                <h3>EMPLOYEES</h3>
                <GrUserAdmin className="card_icon" />
              </div>
              <h1>{count.employees}</h1>
            {/* </Link> */}
                        </div>
           
          </div>
        </div>
      </div>
      <footer>© Copyright: Iwona.</footer>
    </div>
  );
}

export default AdminDashboard;
