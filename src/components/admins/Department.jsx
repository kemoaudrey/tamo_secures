import React, { useEffect, useState } from "react";
import Navbar from "../admins/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component"; // Import DataTable
import "./Modal.css";
import BASE_URL from '../config';
const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const { enterpriseId } = useParams();

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/enterprise/${enterpriseId}/departments`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data);
        setFilteredDepartments(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [enterpriseId]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setFilteredDepartments(
      departments.filter((department) =>
        department.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleSelectRows = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row.id));
  };

  const handleBulkDelete = async () => {
    if (window.confirm("Are you sure you want to delete selected departments?")) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/enterprises/${enterpriseId}/bulk-delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departmentIds: selectedRows }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete departments");
        }

        setDepartments(departments.filter((dept) => !selectedRows.includes(dept.id)));
        setFilteredDepartments(filteredDepartments.filter((dept) => !selectedRows.includes(dept.id)));
        toast.success("Departments deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
        setSelectedRows([]);
        setIsBulkDeleteModalOpen(false);
      }
    }
  };
  const handleDelete = async (departmentId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/enterprises/${enterpriseId}/departments/${departmentId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete department");
        }

        setDepartments(departments.filter((department) => department.id !== departmentId));
        toast.success("Department deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const openEditModal = async (departmentId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/enterprise/${enterpriseId}/department/${departmentId}/edit`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch department data");
      }
      const department = await response.json();
      setSelectedDepartment(department);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/enterprise/${enterpriseId}/departments/${selectedDepartment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: selectedDepartment.name }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update department");
      }

      const updatedDepartments = departments.map((dept) =>
        dept.id === selectedDepartment.id ? { ...dept, name: selectedDepartment.name } : dept
      );
      setDepartments(updatedDepartments);
      toast.success("Department updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const columns = [
    {
      name: "Department Name",
      selector: (row) => row.name || "N/A", 
      // selector: "name",
      sortable: true,
    },
    {
      name: "Chefs",
      // selector: "chefs",
      selector: (row) => row.chefs?.join(", ") || "N/A",
      // cell: (row) => row.chefs.join(", "),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
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
          <Link to={`/enterprise/${enterpriseId}/departments/${row.id}/chef/create`}>
            <button className="btn btn-outline-success btn-rounded">
              Add Chef
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar />
        <div className="content">
          <Link className="btn-add" to={`/departments/${enterpriseId}/create`}>
            <i className="fas fa-plus"></i>
            Add New Department
          </Link>
          <h2>Department List</h2>
          <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name or email"
                // value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
                <div className="bulk-actions">
              <button
                className="btn btn-danger"
                onClick={() => setIsBulkDeleteModalOpen(true)}
                disabled={selectedRows.length === 0}
              >
                Delete Selected
              </button>
            </div>
            {loading ? (
          <p>Loading departments...</p>
        ) : filteredDepartments.length === 0 ? (
          <p>No departments found for this enterprise.</p>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={filteredDepartments}
              progressPending={loading}
              pagination
              highlightOnHover
              selectableRows
              onSelectedRowsChange={handleSelectRows}
            />
          
          </>
        )}
        </div>
        {isBulkDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Bulk Delete</h3>
            <p>Are you sure you want to delete the selected departments?</p>
            <div className="modal-actions">
              <button onClick={() => setIsBulkDeleteModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleBulkDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      </div>

      {isModalOpen && selectedDepartment && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Department</h3>
            <label htmlFor="department-name">Name:</label>
            <input
              id="department-name"
              type="text"
              value={selectedDepartment.name}
              onChange={(e) =>
                setSelectedDepartment({ ...selectedDepartment, name: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleUpdate}>Save</button>
            </div>
          </div>
        </div>
      )}
      <footer>© Copyright: Iwona.</footer>
    </div>
  );
};

export default Department;
