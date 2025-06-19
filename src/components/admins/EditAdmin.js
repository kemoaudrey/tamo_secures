import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get/admin/${id}`);
        if (!response.ok) throw new Error('Failed to fetch admin');
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Correctly access 'name' attribute
    setAdmin((prev) => ({ ...prev, [name]: value })); // Update state dynamically based on the input name
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin),
      });

      if (!response.ok) throw new Error('Failed to update admin');
      toast.success('Admin updated successfully!'); // Notify success
      navigate(`/super/admin/admins/${admin.enterprise_id}`);  // Redirect to the admins list
    } catch (err) {
      setError(err.message);
      toast.error('Error updating admin'); // Notify error
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
              <h2>Edit Admin</h2>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput label="Name" name="username" value={admin.username} onChange={handleChange} required />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput label="Email" type="email" name="email" value={admin.email} onChange={handleChange} required />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput label="New Password" name="password" type="password" value={admin.password} onChange={handleChange} />
                  </MDBCol>
                </MDBRow>
                <MDBBtn type="submit">Save Changes</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </div>
  );
};

export default EditAdmin;