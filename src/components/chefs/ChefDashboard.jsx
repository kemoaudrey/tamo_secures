import React, { useEffect, useState, useCallback } from "react";
import "./ChefDashboard.module.css"; // Make sure to style your dashboard
// import styles from "./ChefDashboard.module.css";

import Navbar from "../chefs/navbar/Navbar"; // Include the navbar
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import Modal from "react-modal"; 
import { MdQrCode } from "react-icons/md";
import DataTable from "react-data-table-component";
import BASE_URL from '../config';
function ChefDashboard() {
    const { enterpriseId, departmentId } = useParams(); // Extracting enterprise, chef, and department IDs from URL
    const [counts, setCounts] = useState({ admin: 0, department: 0, chef_department: 0, employee: 0 });
    const [enterprise, setEnterprise] = useState(null); // Changed to null for better checks
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState(null); // For QR Code preview
  
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/enterprise/${enterpriseId}/departments/${departmentId}/employees`
          );
  
          if (!response.ok) throw new Error("Failed to fetch employees");
          const data = await response.json();
          setEmployees(data.employees);
        } catch (err) {
          setError(err.message);
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmployees();
    }, [enterpriseId, departmentId]);
  
    const handleEdit = (employee) => {
      setSelectedEmployee(employee);
      setIsEditModalOpen(true);
    };
  
    const handleUpdateEmployee = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(
          `${BASE_URL}/api/employees/${selectedEmployee.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedEmployee),
          }
        );
        if (!response.ok) throw new Error("Failed to update employee");
  
        toast.success("Employee updated successfully");
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === selectedEmployee.id ? selectedEmployee : emp))
        );
        setIsEditModalOpen(false);
      } catch (err) {
        toast.error(err.message);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) throw new Error("Failed to delete employee");
  
        setEmployees(employees.filter((employee) => employee.id !== id));
        toast.success("Employee deleted successfully");
      } catch (err) {
        toast.error(err.message);
      }
    };
  
    const handleGenerateQRCode = async (employeeId) => {
      try {
          const response = await fetch(`${BASE_URL}/api/generate-qrcode/${employeeId}`);
          if (!response.ok) throw new Error("Failed to generate QR code");
  
          const qrCodeUrl = `${BASE_URL}/api/generate-qrcode/${employeeId}`; // Use API endpoint to fetch QR code
          setQrCodeUrl(qrCodeUrl); // Set URL for modal preview
          setIsQRCodeModalOpen(true); // Open modal to display QR Code
      } catch (error) {
          console.error("Error generating QR code:", error);
          toast.error("Failed to generate QR code");
      }
  };
  
  
    
    
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
    
    // Function to fetch counts
    const fetchCounts = useCallback(async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/counts?enterprise_id=${enterpriseId}&department_id=${departmentId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch counts");
            }
            const data = await response.json();
            setCounts(data);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }, [enterpriseId, departmentId]);

    useEffect(() => {
        fetchCounts(); // Fetch counts and admin info on component mount
    }, [fetchCounts]);

    const columns = [
        {
          name: "Image",
          selector: row => (
              <img
                  src={row.image ? `${BASE_URL}/uploads/employees/${row.image}` : "/default-avatar.png"}
                  // Construct the URL
                  alt=''
                  style={{ width: "100px", height: "100px", borderRadius: "5px" }}
              />
          ),
          sortable: false,
          width: '10%',
      },
        { name: "Name", selector: (row) => row.name, sortable: true, width: "15%" },
        { name: "Email", selector: (row) => row.email, sortable: true, width: "15%" },
        { name: "Phone Number", selector: (row) => row.phone_number, width: "12%" },
        { name: "Job Title", selector: (row) => row.job_title, width: "10%" },
        {
          name: "Actions",
          cell: (row) => (
            <div>
            <button
                className="btn btn-outline-primary btn-rounded"
                onClick={() => handleEdit(row)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-rounded"
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </button>
              <Link to={`/employee/vcard/${row.id}`}>
                <button className="btn btn-outline-success btn-rounded">
                  Vcard
                </button>
              </Link>
              <button
                className="qrcode-button"
                onClick={() => handleGenerateQRCode(row.id)}
              >
                <MdQrCode />
              </button>
            </div>
          ),
          width: "30%",
        },
      ];

    return (
        <div className="dashboard-container">
            <div className="main-content">
                <Navbar  enterprise={enterprise}/>
                <div className="content">
                {enterprise && (
          <h2>Dashboard /{enterprise.enterprise_name} </h2>
        )}
                    <div className="welcome-card">
                        <h1>Welcome</h1> {/* Displaying Chef ID */}
                        <span>Manage your department effectively!</span>
                    </div>

                    <div className="main-cards">
                        <div className="cards">
                            <div className="card-inner">
                                <h3>CHIEFS OF DEPARTMENTS</h3>
                                <GrUserAdmin className="card_icon" />
                            </div>
                            <h1>{counts.chef_department}</h1>
                        </div>
                        <Link to={`/enterprise/${enterpriseId}/department/${departmentId}/employees`} className="cards">
                            <div className="card-inner">
                                <h3>EMPLOYEES</h3>
                                <GrUserAdmin className="card_icon" />
                            </div>
                            <h1>{counts.employee}</h1>
                        </Link>
                    </div>
                    <Link
            className="btn-add"
            to={`/enterprise/${enterpriseId}/department/${departmentId}/create/employee`}
          >
            <i className="fas fa-plus"></i>
            Add New Employee
          </Link>
          <h2>Employee List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={employees}
              pagination
              highlightOnHover
              pointerOnHover
              responsive
              className="data-table"
            />
          )}
                </div>
            </div>
                     {/* Edit Employee Modal */}
          <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Employee"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedEmployee && (
          <form onSubmit={handleUpdateEmployee}>
            <h2>Edit Employee</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={selectedEmployee.name}
              onChange={handleInputChange}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={selectedEmployee.email}
              onChange={handleInputChange}
              required
            />
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={selectedEmployee.phone_number}
              onChange={handleInputChange}
              required
            />
            <label>Job Title:</label>
            <input
              type="text"
              name="job_title"
              value={selectedEmployee.job_title}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </Modal>
      {/* QR Code Modal */}
      <Modal
    isOpen={isQRCodeModalOpen}
    onRequestClose={() => setIsQRCodeModalOpen(false)}
    contentLabel="QR Code Preview"
    className="qr-code-modal"
    overlayClassName="qr-code-overlay"
>
    <h2>QR Code</h2>
    {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" />
    ) : (
        <p>Loading QR Code...</p>
    )}
    <button
        className="btn btn-outline-secondary"
        onClick={() => setIsQRCodeModalOpen(false)}
    >
        Close
    </button>
</Modal>

            <footer>© Copyright: Iwona.</footer>
        </div>
    );
}

export default ChefDashboard;
