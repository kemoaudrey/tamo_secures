import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../admins/navbar/Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import BASE_URL from '../config';
function AddDepartment() {
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const { enterpriseId } = useParams(); // Extract enterpriseId from URL
  const [departmentName, setDepartmentName] = useState('');
  const navigate = useNavigate();

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
  
    if (!departmentName) {
      notifyError('All fields are required!');
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/api/enterprise/${enterpriseId}/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: departmentName // Pass only the department name
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        notifyError(errorData.error || 'Failed to create department.');
        return;
      }
  
      notifySuccess(`Department ${departmentName} created successfully!`);
      
      // Clear input fields
      setDepartmentName('');
  
      // Redirect to the departments page
      navigate(`/enterprise/${enterpriseId}/departments`);
  
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="main-content">
        <Navbar />
        <div className="content">
          <form onSubmit={handleCreateDepartment}>
            <MDBContainer className="my-3">
              <MDBCard>
                <MDBCardBody>
                  <h3>Create Department</h3>
                  <MDBInput
                    label="Department Name"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                    className="mb-3"
                  />
                  <MDBBtn className="mb-3 custom-btn" type="submit">
                    Create Department
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </form>
        </div>
      </div>
      <footer>© Copyright: Iwona.</footer>
    </div>
  );
}

export default AddDepartment;
