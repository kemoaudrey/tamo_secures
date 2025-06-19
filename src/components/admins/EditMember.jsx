import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To extract chefId from URL and navigate
import Navbar from "../admins/navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const EditMember = () => {
  const { enterpriseId, chefId } = useParams(); 
  const navigate = useNavigate(); // To programmatically navigate after updating
  const [chef, setChef] = useState({
    username: "",
    email: "",
    department_id: "", // Assuming you also want to edit department ID
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chef details for the specific chefId
  useEffect(() => {
    const fetchChef = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/chef/${chefId}`);
            if (!response.ok) {
                // Log the response status for debugging
                console.error(`Error fetching chef: ${response.status} ${response.statusText}`);
                throw new Error("Failed to fetch chef details");
            }
            const data = await response.json();
            setChef(data);
        } catch (err) {
            console.error(err);  // Log error for debugging
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchChef();
}, [chefId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`${BASE_URL}/api/chefs/${chefId}`, {
        method: "PUT", // Use PUT for update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chef),
      });

      if (!response.ok) throw new Error("Failed to update chef");

      toast.success("Chef updated successfully!");
    //   navigate(`/enterprises/${chef.enterprise_id}/departments/${chef.department_id}/chefs`); // Redirect after successful update
      navigate(`/enterprise/${enterpriseId}/chefs`); 
    } catch (err) {
      toast.error(err.message); // Notify error
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar />
        <MDBContainer>
          <MDBCard>
            <MDBCardBody>
            <h2>Edit Chef</h2>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput label="Name" name="username" id="username"
            value={chef.username}
            onChange={(e) => setChef({ ...chef, username: e.target.value })}
            required />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput label="Email" type="email" name="email"  id="email"
            value={chef.email}
            onChange={(e) => setChef({ ...chef, email: e.target.value })}
            required />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput label="New Password" name="password" type="password" value={chef.password} onChange={(e) => setChef({ ...chef, password: e.target.value })} />
                  </MDBCol>
                </MDBRow>
                <MDBBtn type="submit">Update Chef</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </div>
  );
};

export default EditMember;
