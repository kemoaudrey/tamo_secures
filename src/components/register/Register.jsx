import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmail } from "validator";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import BASE_URL from '../config';
function Register() {
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "This field is required!";
    else if (name.length < 3 || name.length > 20)
      errors.name = "The username must be between 3 and 20 characters.";

    if (!email) errors.email = "This field is required!";
    else if (!isEmail(email)) errors.email = "This is not a valid email.";

    if (!password) errors.password = "This field is required!";
    else if (password.length < 6 || password.length > 40)
      errors.password = "The password must be between 6 and 40 characters.";

    return errors;
  };

  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    setErrorMessages(validationErrors);
  
    if (Object.keys(validationErrors).length > 0) {
      return; // Prevent submission if there are validation errors
    }
  
    setLoading(true); // Start loading state
  
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        notifyError(errorData.error || "Registration failed!");
        return;
      }
      
      notifySuccess(`SuperAdmin Registered successfully!`); // You can also use data if needed.
  
      // Redirect to login or dashboard on successful registration
      navigate("/login"); // Change this to your desired route
    } catch (error) {
      notifyError(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <MDBContainer className="my-3">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={"assets/Mobile-login.jpg"}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign Up Now
              </h5>

              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Full Name"
                    id="form1"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errorMessages.name && (
                    <div className="invalid-feedback d-block">{errorMessages.name}</div>
                  )}
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="form2"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errorMessages.email && (
                    <div className="invalid-feedback d-block">{errorMessages.email}</div>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessages.password && (
                <div className="invalid-feedback d-block">{errorMessages.password}</div>
              )}

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                style={{ background: "#FF6666" }}
                size="lg"
                onClick={handleRegister}
                disabled={loading} // Disable button during loading
              >
                {loading ? "Registering..." : "Register"} {/* Change button text */}
              </MDBBtn>

              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Already have an account? <br />
                <Link to="/login" style={{ color: "#393f81" }}>
                  Login here
                </Link>
              </p>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
