import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../SuperAdmin_Dashboard/navbar/Navbar";
import "./Enterprise.css";
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
function AddEnterprise() {
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  
  const [enterprise, setEnterprise] = useState({
    name: "",
    sector_of_activity: "",
    contact: "",
    email: "",
    geographical_location: "",
    website: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleCreateEnterprise = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", enterprise.name);
    formData.append("sector_of_activity", enterprise.sector_of_activity);
    formData.append("contact", enterprise.contact);
    formData.append("email", enterprise.email);
    formData.append("geographical_location", enterprise.geographical_location);
    formData.append("website", enterprise.website);
    formData.append("image", enterprise.image);  // Ensure this key matches the backend

    try {
        const response = await fetch(`${BASE_URL}/api/enterprises`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            notifyError(errorData.error || "Failed to create enterprise.");
            return;
        }

        const data = await response.json();
        notifySuccess(`Enterprise ${data.message} created successfully!`);

        // Clear input fields
        setEnterprise({
            name: "",
            sector_of_activity: "",
            contact: "",
            email: "",
            geographical_location: "",
            website: "",
            image: null,
        });
        setImagePreview(""); // Clear image preview

        // Redirect to the create admin page
        navigate(`/super/admin/enterprises`);
    } catch (error) {
        notifyError(error.message);
    }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEnterprise((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    } else {
      setImagePreview("");
    }
  };

  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <div className="main-content">
        <Navbar />
        <div className="content">
          <form onSubmit={handleCreateEnterprise}>
            <MDBContainer className="my-3">
              <MDBCard>
                <MDBRow className="g-0">
                  <MDBCol>
                    <MDBCardBody>
                      <h3>Create Enterprise</h3>

                      {/* Enterprise Name */}
                      <MDBInput
                        label="Enterprise Name"
                        value={enterprise.name}
                        onChange={(e) => setEnterprise((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="mb-3"
                      />

                      {/* Sector of Activity */}
                      <MDBInput
                        label="Sector of Activity"
                        value={enterprise.sector_of_activity}
                        onChange={(e) => setEnterprise((prev) => ({ ...prev, sector_of_activity: e.target.value }))}
                        required
                        className="mb-3"
                      />

                      {/* Contact */}
                      <MDBInput
                        label="Contact"
                        value={enterprise.contact}
                        onChange={(e) => setEnterprise((prev) => ({ ...prev, contact: e.target.value }))}
                        required
                        className="mb-3"
                      />

                      {/* Enterprise Email */}
                      <MDBInput
                        label="Enterprise Email"
                        value={enterprise.email}
                        onChange={(e) => setEnterprise((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="mb-3"
                      />

                      {/* Geographical Location */}
                      <MDBInput
                        label="Geographical Location"
                        value={enterprise.geographical_location}
                        onChange={(e) => setEnterprise((prev) => ({ ...prev, geographical_location: e.target.value }))}
                        required
                        className="mb-3"
                      />

                      {/* Website */}
                      <MDBInput
                        label="Website"
                        value={enterprise.website}
                        onChange={(e) => setEnterprise((prev) => ({ ...prev, website: e.target.value }))}
                        required
                        className="mb-3"
                      />

                      {/* Image Upload */}
                      <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="inputGroupFile01">
                          Select Image
                        </label>
                        <MDBInput
                          type="file"
                          className="form-control rounded-0"
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

                      {/* Submit Button */}
                      <MDBBtn className="mb-3 custom-btn" type="submit">
                        Create Enterprise
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBContainer>
          </form>
        </div>
      </div>
      <footer>© Copyright: Iwona.</footer>
    </div>
  );
}

export default AddEnterprise;
