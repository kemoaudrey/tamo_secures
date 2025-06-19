import React, { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component"; // Import if using react-data-table-component
import "./SuperAdminDashboard.css";
import { Link } from "react-router-dom";
import Navbar from "../SuperAdmin_Dashboard/navbar/Navbar";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidBusiness } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { BsFillBellFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../loader/Loader.css";
import BASE_URL from '../config';
// import "../admins/Modal.css";

// BulkActionModal Component
function BulkActionModal({ show, onClose, onConfirm, selectedCount, action }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Bulk Action</h2>
        <p>
          Are you sure you want to {action} {selectedCount} selected SuperAdmins?
        </p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onConfirm}>
            Yes, {action}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Component
function EditModal({ show, onClose, superAdmin, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!show) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [show]);

  useEffect(() => {
    if (superAdmin) {
      setFormData({
        name: superAdmin.name || "",
        email: superAdmin.email || "",
        password: superAdmin.password || "",
      });
    }
  }, [superAdmin]);

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
        <h2>Edit SuperAdmin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
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
function SuperAdminDashboard() {
  const [counts, setCounts] = useState({
    enterprises: 0,
    superadmins: 0,
    admins: 0,
  });
  const [superadminName, setSuperadminName] = useState("");
  const [superadmins, setSuperadmins] = useState([]); // State to store the list of superadmins
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState(null);
  const [filteredSuperadmins, setFilteredSuperadmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false); // Loader state for bulk actions
  const [showBulkModal, setShowBulkModal] = useState(false); // Modal state for bulk actions
  const handleRowSelected = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };
  
  const token = localStorage.getItem("token");

   // Fetch superadmin counts
   const fetchCounts = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/superadmin/counts`);
      if (!response.ok) throw new Error("Failed to fetch counts");
      const data = await response.json();
      setCounts(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, []);

// Fetch superadmin info
const fetchSuperadminInfo = useCallback(async () => {
  if (!token) {
    toast.error("Session expired. Please log in again.");
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/superadmin/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        window.location.href = "/login";
      } else {
        throw new Error("Failed to fetch superadmin info");
      }
    }

    const data = await response.json();
    setSuperadminName(data.name);
  } catch (error) {
    console.error(error);
    toast.error(error.message || "An error occurred.");
  }
}, [token]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this SuperAdmin?")) {
      return; // Exit if the user cancels the deletion
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/superadmin/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete SuperAdmin");

      const data = await response.json();
      toast.success(data.message); // Show success message

      // Remove the deleted superadmin from the list
      setSuperadmins((prevSuperadmins) =>
        prevSuperadmins.filter((admin) => admin.id !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message); // Show error message
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/get/superadmins/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch SuperAdmin data");

      const data = await response.json();
      setCurrentSuperAdmin(data.superAdmin);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/superadmin/update/${currentSuperAdmin.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update SuperAdmin");

      toast.success("SuperAdmin updated successfully");
      setSuperadmins((prev) =>
        prev.map((admin) =>
          admin.id === currentSuperAdmin.id
            ? { ...admin, ...updatedData }
            : admin
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch list of superadmins
  const fetchSuperadmins = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/get/superadmins`);
      if (!response.ok) throw new Error("Failed to fetch superadmins");
      const data = await response.json();
      setSuperadmins(data.superAdmins || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect for initial data fetching
  useEffect(() => {
    fetchCounts();
    fetchSuperadminInfo();
    fetchSuperadmins();
  }, [fetchCounts, fetchSuperadminInfo, fetchSuperadmins]);


   // Update filteredSuperadmins when superadmins or searchQuery changes
   useEffect(() => {
    setFilteredSuperadmins(
      superadmins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [superadmins, searchQuery]);

  // Handle search query change
  const handleSearch = (e) => setSearchQuery(e.target.value);

  

  const handleBulkDelete = async () => {
    setShowBulkModal(false); // Close the modal
    setBulkActionLoading(true); // Show loader
    try {
      const idsToDelete = selectedRows.map((row) => row.id);
      const response = await fetch(
        `${BASE_URL}/api/superadmin/delete-bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ids: idsToDelete }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to delete selected SuperAdmins");

      const data = await response.json();
      toast.success(data.message);

      // Remove deleted superadmins from the list
      setSuperadmins((prev) =>
        prev.filter((admin) => !idsToDelete.includes(admin.id))
      );
      setSelectedRows([]); // Reset selected rows
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setBulkActionLoading(false); // Hide loader
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },

    {
      name: "Created At",
      selector: (row) =>
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(row.created_at)),
    },

    // { name: 'Created At', selector: row => row.created_at, sortable: true },
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
        <div className="main-content">
          <Navbar />
          <div className="content">
            <h2>Dashboard</h2>
            <div className="welcome-card">
              <h1>Welcome, {superadminName}</h1>
              <span>STREAMLINING ENTERPRISE MANAGEMENT.</span>
            </div>

            <div className="main-cards">
              <div className="cards">
                <div className="card-inner">
                  <h3>SUPER ADMINS</h3>
                  <RiAdminFill className="card_icon" />
                </div>
                <h1>{counts.superadmins}</h1>
              </div>
              <Link  to="/super/admin/enterprises" className="cards">
              <div className="card-inner">
              <h3>ENTERPRISES</h3>
              <BiSolidBusiness className="card_icon" />
              </div>
              <h1>{counts.enterprises}</h1>
            </Link>
              <div className="cards">
                <div className="card-inner">
                  <h3>ENTERPRISE ADMINS</h3>
                  <GrUserAdmin className="card_icon" />
                </div>
                <h1>{counts.admins}</h1>
              </div>
              <div className="cards">
                <div className="card-inner">
                  <h3>ALERTS</h3>
                  <BsFillBellFill className="card_icon" />
                </div>
                <h1>0</h1>
              </div>
            </div>

            {/* Data Table for Superadmins */}
            <h3>Superadmin List</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <div className="bulk-actions">
              <button
                className="btn btn-danger"
                onClick={() => setShowBulkModal(true)}
                disabled={selectedRows.length === 0}
              >
                Delete Selected
              </button>
            </div>
            <DataTable
              columns={columns}
              data={filteredSuperadmins}
              pagination
              paginationRowsPerPageOptions={[5, 20, 50]}
              highlightOnHover
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              progressPending={loading}
              selectableRowsHighlight
                selectableRowsNoSelectAll={false} // Allow select all
                onRowClicked={() => {}}
              progressComponent={<div className="loader">Loading...</div>}
            />
          </div>

          {/* Edit Modal */}
          <EditModal
            show={showModal}
            onClose={() => setShowModal(false)}
            superAdmin={currentSuperAdmin}
            onSave={handleSave}
          />
          {bulkActionLoading && (
            <div className="loader-overlay">
              <div className="scanner">
                <span>Processing...</span>
              </div>
            </div>
          )}
          <BulkActionModal
            show={showBulkModal}
            onClose={() => setShowBulkModal(false)}
            onConfirm={handleBulkDelete}
            selectedCount={selectedRows.length}
          />
        </div>
      <footer></footer>
    </div>
  );
}

export default SuperAdminDashboard;
