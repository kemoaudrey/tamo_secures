import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../admins/navbar/Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import BASE_URL from '../config';
function AddAdminEnterprise() {
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const navigate = useNavigate();

  // Get enterprise name and ID from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const enterpriseName = queryParams.get('name'); // Extracting enterprise name
  const enterpriseId = location.pathname.split('/').pop(); // Extracting enterprise ID from URL

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    // Validate input
    if (!adminName || !adminEmail || !adminPassword) {
      notifyError('All fields are required!');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/enterprises/${enterpriseId}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: adminName, 
          email: adminEmail, 
          password: adminPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        notifyError(errorData.error || 'Failed to create admin.');
        return; // Stop further execution
      }

      notifySuccess(`Admin ${adminName} created successfully!`);

      // Clear input fields
      setAdminName('');
      setAdminEmail('');
      setAdminPassword('');

      // Redirect to the admin list for the specific enterprise
      navigate(`/enterprise/${enterpriseId}/super/admin/admins/?name=${enterpriseName}`);
      
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar enterpriseId={enterpriseId} enterpriseName={enterpriseName}/>
        <div className="content">
          <h3>Create Admin for Enterprise: {enterpriseName}</h3>
          <form onSubmit={handleCreateAdmin}>
            <MDBContainer className="my-3">
              <MDBCard>
                <MDBRow className="g-0">
                  <MDBCol>
                    <MDBCardBody className="d-flex flex-column">
                      <MDBInput
                        label="Admin Name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                        className="mb-3"
                      />
                      <MDBInput
                        label="Admin Email"
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                        className="mb-3"
                      />
                      <MDBInput
                        label="Admin Password"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                        className="mb-3"
                      />
                      <MDBBtn className="mb-3 custom-btn" type="submit">
                        Create Admin
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBContainer>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAdminEnterprise;
