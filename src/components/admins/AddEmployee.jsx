import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit"; // Import MDB components
import Navbar from "../chefs/navbar/Navbar"; // Import Navbar
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css"; // Ensure MDB styles are imported
import BASE_URL from '../config';
const RegisterEmployee = () => {
  const { enterpriseId, departmentId } = useParams(); // get enterprise and department ID from URL params
  const [employee, setEmployee] = useState({
    name: "",
    sector_of_activity: "",
    contact: "",
    email: "",
    geographical_location: "",
    website: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("phone_number", employee.phone_number);
      formData.append("job_title", employee.job_title);
      formData.append("image", employee.image);  // Ensure this key matches the backend

      const response = await fetch(
        `${BASE_URL}/api/register/employee?enterprise_id=${enterpriseId}&department_id=${departmentId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to register employee");

      toast.success("Employee registered successfully!");
      console.log("QR Code Path:", result.qr_code_path);

         // Clear input fields
         setEmployee({
          name: "",
          email: "",
          phone_number: "",
          job_title: "",
          image: null,
      });
      setImagePreview("");
    } catch (error) {
      toast.error("Error registering employee: " + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar />
        <div className="content">
          <form onSubmit={handleSubmit}>
            {/* <MDBContainer className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}> */}
            <MDBContainer className="my-3">
              <MDBRow>
                <MDBCol>
                  <MDBCard>
                    <MDBCardBody className="d-flex flex-column">
                      <MDBCardTitle className="text-center mb-4">
                        Register Employee
                      </MDBCardTitle>
                      <MDBInput
                        label="Name"
                        type="text"
                        value={employee.name}
                        onChange={(e) => setEmployee((prev) => ({ ...prev, name: e.target.value }))}
                      
                        required
                        className="mb-3"
                      />
                      <MDBInput
                        label="Email"
                        type="email"
                        value={employee.email}
                        onChange={(e) => setEmployee((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="mb-3"
                      />
                      <MDBInput
                        label="Phone Number"
                        type="text"
                        value={employee.phone_number}
                        onChange={(e) => setEmployee((prev) => ({ ...prev, phone_number: e.target.value }))}
                        className="mb-3"
                      />
                      <MDBInput
                        label="Job Title"
                        type="text"
                        value={employee.job_title}
                        onChange={(e) => setEmployee((prev) => ({ ...prev, job_title: e.target.value }))}
                        className="mb-3"
                      />
                   
                      {/* Image Upload */}
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="inputGroupFile01">
                          Select Image
                        </label>
                        <MDBInput
                          type="file"
                          accept="image/*"
                          className="form-control rounded-0"
                          //  className="mb-3"
                          id="inputGroupFile01"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </div>
                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="image-preview mb-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      )}
                      <MDBBtn type="submit" color="success" block>
                        Register Employee
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmployee;
