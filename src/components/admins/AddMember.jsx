import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Navbar from "../admins/navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import BASE_URL from '../config';
const AddMember = () => {
  const { departmentId, enterpriseId } = useParams();  // Extract departmentId and enterpriseId from URL
  const navigate = useNavigate();
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [chefName, setChefName] = useState('');
  const [chefEmail, setChefEmail] = useState('');
  const [chefPassword, setChefPassword] = useState('');

  const handleCreateChef = async (e) => {
    e.preventDefault();

    // Validate input
    if (!chefName || !chefEmail || !chefPassword) {
      notifyError('All fields are required!');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/enterprise/${enterpriseId}/department/${departmentId}/chef`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: chefName,
          email: chefEmail,
          password: chefPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        notifyError(errorData.error || 'Failed to create chef.');
        return;
      }

      notifySuccess(`Chef ${chefName} created successfully!`);
      
      // Clear input fields
      setChefName('');
      setChefEmail('');
      setChefPassword('');
      navigate(`/enterprise/${enterpriseId}/departments`);  // Redirect to the departments list for the enterprise
      
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar />
        <MDBContainer>
          <MDBCard>
            <MDBCardBody>
              <h2>Create Chef for Department ID: {departmentId}</h2>
              <form onSubmit={handleCreateChef}>
                <MDBRow>
                  <MDBCol md="12">
                    <MDBInput 
                      label="Chef Name" 
                      name="username" 
                      value={chefName} 
                      onChange={(e) => setChefName(e.target.value)} 
                      required 
                    />
                  </MDBCol>
                  <MDBCol md="12">
                    <MDBInput 
                      label="Email" 
                      name="email" 
                      type="email" 
                      value={chefEmail} 
                      onChange={(e) => setChefEmail(e.target.value)} 
                      required 
                    />
                  </MDBCol>
                  <MDBCol md="12">
                    <MDBInput 
                      label="Password" 
                      name="password" 
                      type="password" 
                      value={chefPassword} 
                      onChange={(e) => setChefPassword(e.target.value)} 
                      required 
                    />
                  </MDBCol>
                </MDBRow>
                <MDBBtn type="submit">Create Chef</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </div>
  );
};

export default AddMember;
