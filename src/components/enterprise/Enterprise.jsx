import React, { useEffect, useState } from "react";
// import Sidebar from "../SuperAdmin_Dashboard/sidebar/Sidebar";
import Navbar from "../SuperAdmin_Dashboard/navbar/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import "./Enterprise.css"; 
import BASE_URL from '../config';

// Modal Component for confirmation
const ConfirmationModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
    <div className="modal-content" closeButton>
      <h2>Confirm Action</h2>
      <p>
      {message}
      </p>
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>

  );
};
// Modal Component
function EditEnterpriseModal({ show, onClose, enterprise, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector_of_activity: "",
    contact: "",
    geographical_location: "",
    website: "",
  });

  useEffect(() => {
    if (enterprise) {
      setFormData({
        name: enterprise.name || "",
        email: enterprise.email || "",
        sector_of_activity: enterprise.sector_of_activity || "",
        contact: enterprise.contact || "",
        geographical_location: enterprise.geographical_location || "",
        website: enterprise.website || "",
      });
    }
  }, [enterprise]); // Ensure this updates when "enterprise" changes

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Enterprise</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enterprise Name</label>
            <input
              name="name"
              value={formData.name} // Use formData here
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email} // Use formData here
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sector of Activity</label>
            <input
              name="sector_of_activity"
              value={formData.sector_of_activity} // Use formData here
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              name="contact"
              value={formData.contact} // Use formData here
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Geographical Location</label>
            <input
              name="geographical_location"
              value={formData.geographical_location} // Use formData here
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              name="website"
              value={formData.website} // Use formData here
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Enterprise = () => {
  const [enterprise, setEnterprise] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEnterprise, setCurrentEnterprise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Search term for filtering
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch enterprises function
  const fetchEnterprises = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/enterprises`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setEnterprise(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnterprises();
  }, []);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

    // Delete multiple selected enterprises
    const handleBulkDelete = () => {
      setConfirmationMessage("Are you sure you want to delete the selected enterprises?");
      setShowConfirmationModal(true);
    };
  
    const confirmBulkDelete = async () => {
      try {
        // Perform bulk delete
        await Promise.all(selectedRows.map((row) =>
          fetch(`${BASE_URL}/api/enterprises/${row.id}`, { method: "DELETE" })
        ));
        // Remove selected rows from state
        setEnterprise(enterprise.filter((e) => !selectedRows.includes(e)));
        toast.success("Selected enterprises deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setShowConfirmationModal(false);
      }
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

  const handleEditClick = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/enterprise/edit/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch enterprise data");

      const data = await response.json();
      setCurrentEnterprise(data.enterprise); // Update first
      setShowModal(true); // Then show modal
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/enterprises/${currentEnterprise.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update enterprise");

      toast.success("Enterprise updated successfully");
      setShowModal(false);

      fetchEnterprises(); // Refresh the enterprise list
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchEnterprises();
  }, []);

  // Handle enterprise deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enterprise?")) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/enterprises/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete enterprise");
        }

        setEnterprise(enterprise.filter((enterprise) => enterprise.id !== id));
        toast.success("Enterprise deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

    // Filter enterprises based on search
    const filteredEnterprises = enterprise.filter(
      (ent) =>
        ent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ent.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Define columns for the data table
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`/Images/${row.image}`} // Construct the URL
          alt=""
          style={{ width: "100px", height: "100px", borderRadius: "5px" }}
        />
      ), 
      sortable: false,
      width: "10%",
    },
    {
      name: "Enterprise Name",
      selector: (row) => row.name || "N/A", // Ensure this is a function
      sortable: true,
      width: "15%",
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A", // Ensure this is a function
      sortable: true,
      width: "15%",
    },
    {
      name: "Admins",
      selector: (row) => row.admins?.join(", ") || "N/A", // Ensure this is a function
      sortable: true,
      width: "10%",
    },
    {
      name: "Contact",
      selector: (row) => row.contact || "N/A", // Ensure this is a function
      sortable: true,
      width: "12%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-outline-primary btn-rounded"
            onClick={() => handleEditClick(row.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-rounded"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
          <Link
            to={`/admin/dashboard/${row.id}?name=${encodeURIComponent(
              row.name
            )}`}
          >
            <button type="button" className="btn btn-outline-info btn-rounded">
              View Account
            </button>
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "30%",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <div className="main-content">
        <Navbar />
        <div className="content">
          <Link className="btn-add" to="/AddEnterprise">
            <i className="fas fa-plus"></i>
            Add New Enterprise
          </Link>
          <h2>Enterprise List</h2>
          <div className="search-bar">
              <input
                type="text"
                  placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <div className="bulk-actions">
              <button
                className="btn btn-danger"
                onClick={handleBulkDelete}
                disabled={selectedRows.length === 0}
              >
                Delete Selected
              </button>
            </div>

          <DataTable
            columns={columns}
            data={filteredEnterprises}
            pagination
            paginationRowsPerPageOptions={[5, 20, 50]}
            progressPending={loading} // Loader when fetching
            highlightOnHover
            responsive
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            selectableRowsHighlight
                selectableRowsNoSelectAll={false} // Allow select all
                onRowClicked={() => {}}
            noDataComponent={<div>No enterprises found.</div>}
            
          />
        </div>
        {/* Edit Modal */}
        <EditEnterpriseModal
          show={showModal}
          onClose={() => setShowModal(false)}
          enterprise={currentEnterprise || {}} // Pass an empty object if null
          onSave={handleSave}
        />
          {/* Confirmation Modal */}
          <ConfirmationModal
          show={showConfirmationModal}
          onConfirm={confirmBulkDelete}
          onCancel={() => setShowConfirmationModal(false)}
          message={confirmationMessage}
        />
      </div>
      <footer>© Copyright: Iwona.</footer>
    </div>
  );
};

export default Enterprise;

// Extend the dashboard to include role and permission management for superadmins.