import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../admins/navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component"; // Import DataTable
import "./Modal.css";
import BASE_URL from '../config';

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
const Members = () => {
  const { enterpriseId } = useParams();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChef, setSelectedChef] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Fetch chefs for the specified enterprise
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/get/chefs?enterprise_id=${enterpriseId}`
        );
        if (!response.ok) throw new Error("Failed to fetch chefs");
        const data = await response.json();
        setChefs(data.chefs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [enterpriseId]);

  const handleDelete = async (chefId) => {
    if (window.confirm("Are you sure you want to delete this chef?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/chefs/${chefId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete chef");
        setChefs(chefs.filter((chef) => chef.id !== chefId));
        toast.success("Chef deleted successfully!");
      } catch (err) {
        toast.error("Error deleting chef: " + err.message);
      }
    }
  };

  const handleBulkDeleteConfirm = async () => {
    setShowConfirmationModal(false);
    try {
      const idsToDelete = selectedRows.map((row) => row.id);
      const response = await fetch(
        `${BASE_URL}/api/chefs/delete-bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure Content-Type is set correctly
          },
          body: JSON.stringify({ ids: idsToDelete }), // Convert the payload to JSON
        }
      );
  
      if (!response.ok) throw new Error("Failed to delete selected chefs");
  
      const data = await response.json();
      toast.success(data.message);
  
      // Remove deleted chefs from the list
      setChefs((prev) =>
        prev.filter((chef) => !idsToDelete.includes(chef.id))
      );
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  
  const openBulkDeleteConfirmation = () => {
    setConfirmationMessage("Are you sure you want to delete the selected chefs?");
    setShowConfirmationModal(true);
  };


  const openEditModal = async (chefId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chef/${chefId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chef data");
      }
      const chefToEdit = await response.json();
      setSelectedChef(chefToEdit);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleUpdateChef = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/chefs/${selectedChef.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: selectedChef.username,
            email: selectedChef.email,
            department_id: selectedChef.department_id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update chef");
      }

      const updatedChefs = chefs.map((chef) =>
        chef.id === selectedChef.id ? { ...chef, ...selectedChef } : chef
      );
      setChefs(updatedChefs);
      toast.success("Chef updated successfully!");
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username || "N/A",
      width: "15%",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
      width: "15%",
    },
    {
      name: "Department",
      selector: "department_name",
      cell: (row) => row.department_name || "Not assigned",
      width: "15%",
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <button
            className="btn btn-outline-primary btn-rounded"
            onClick={() => openEditModal(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-rounded"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
          {row.department_id ? (
            <>
              <Link
                to={`/enterprise/${enterpriseId}/chef/${row.id}/department/${row.department_id}/create/employee`}
              >
                <button className="btn btn-outline-success btn-rounded">
                  Register Employee
                </button>
              </Link>
              <Link
                to={`/enterprise/${enterpriseId}/department/${row.department_id}/employees`}
              >
                <button className="btn btn-outline-info btn-rounded">
                  View Employees
                </button>
              </Link>
            </>
          ) : (
            <button className="btn btn-outline-secondary btn-rounded" disabled>
              No Department
            </button>
          )}
        </>
      ),
      width: "40%",
    },
  ];

  const handleRowSelected = (chefId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(chefId)
        ? prevSelectedRows.filter((id) => id !== chefId)
        : [...prevSelectedRows, chefId]
    );
  };


  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar />
        <div className="content">
          <h2>Chefs List</h2>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <>
              <div className="d-flex justify-content-between mb-3">
                <input
                  type="text"
                  placeholder="Search chefs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ width: "300px" }}
                />

                <button
  onClick={openBulkDeleteConfirmation}
  className="btn btn-danger"
  disabled={selectedRows.length === 0}
>
  Delete Selected
</button>

              </div>

              <DataTable
                columns={columns}
                data={chefs.filter((chef) =>
                  chef.username.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                pagination
                highlightOnHover
                responsive
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                // onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
                selectableRowsHighlight
                selectableRowsNoSelectAll={false} // Allow select all
                onRowClicked={() => {}}
                // customStyles={{
                //   headCells: {
                //     style: {
                //       backgroundColor: "#f4f6f9",
                //     },
                //   },
                // }}
              />
            </>
          )}
        </div>

        {isModalOpen && selectedChef && (
          <div className={`modal ${isModalOpen ? "open" : ""}`}>
            <div className="modal-content">
              <h3>Edit Chef</h3>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={selectedChef.username}
                onChange={(e) =>
                  setSelectedChef((prevChef) => ({
                    ...prevChef,
                    username: e.target.value,
                  }))
                }
              />
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={selectedChef.email}
                onChange={(e) =>
                  setSelectedChef((prevChef) => ({
                    ...prevChef,
                    email: e.target.value,
                  }))
                }
              />
              <button onClick={handleUpdateChef}>Update</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
          
        )}
           {/* Confirmation Modal */}
           <ConfirmationModal
          show={showConfirmationModal}
          onConfirm={handleBulkDeleteConfirm}
          onCancel={() => setShowConfirmationModal(false)}
          message={confirmationMessage}
        />
      </div>
    </div>
  );
};

export default Members;
