import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import BASE_URL from '../config';

function Login() {
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
        notifyError("All fields are required!");
        return;
    }

    setLoading(true); // Start loading state

    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Invalid email or password");
        }

        const data = await response.json();

        // Store user role, ID, enterprise ID, and name in local storage
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("enterpriseId", data.enterprise_id); // Use correct property for enterprise ID
        localStorage.setItem("enterpriseName", data.enterprise_name); // Store enterprise name
        localStorage.setItem("departmentId", data.department_id);
        localStorage.setItem("chefId", data.chef_id);
        localStorage.setItem("token", data.token); // Store JWT token

        // Redirect based on role
        if (data.role === "superadmin") {
            navigate("/super/admin/dashboard");
            notifySuccess("SuperAdmin Login successfully!");
        } else if (data.role === "admin") {
            navigate(`/enterprise/${data.enterprise_id}/admin/dashboard?name=${encodeURIComponent(data.enterprise_name)}`);
            notifySuccess("Admin Login successfully!");
        } else if (data.role === "chef") {
          console.log("Chef ID (before navigate):", data.chef_id);
          navigate(`/enterprise/${data.enterprise_id}/department/${data.department_id}/chef/${data.chef_id}/dashboard?name=${encodeURIComponent(data.enterprise_name)}`);

            notifySuccess("Chef of Department Login successfully!");
        }

    } catch (error) {
        notifyError(error.message);
        setErrorMessage(error.message);
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
            src="assets/5098293.jpg"
            alt="login form"
            className="rounded-start w-100"
          />
        </MDBCol>
        <MDBCol md="6">
          <MDBCardBody className="d-flex flex-column">
            <div className="d-flex flex-row mt-2">
              <div className="logo">
                <img alt="logo" src="assets/vcard.png" />
              </div>
              {/* <span className="h1 fw-bold mb-0">Logo</span> */}
            </div>
            <h5
              className="fw-normal my-4 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Sign into your account
            </h5>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby="emailHelp"
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="passwordHelp"
            />

            <MDBBtn
              className="mb-4 px-5"
              color="dark"
              style={{ background: "#FF6666" }}
              size="lg"
              onClick={handleLogin}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Logging in..." : "Login"} {/* Change button text */}
            </MDBBtn>

            <Link to="/forgot-password" className="small text-muted">
              Forgot Password?
            </Link>

            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
              Don't have an account? <br />
              <Link to="/register" style={{ color: "#393f81" }}>
                Register here
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

export default Login;
