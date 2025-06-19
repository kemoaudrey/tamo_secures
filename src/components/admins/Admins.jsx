import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To extract enterprise ID from the URL
import Navbar from "../admins/navbar/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from '../config';
import DataTable from 'react-data-table-component';  // Importing DataTable

const Admins = () => {
  const { enterpriseId } = useParams(); // Get enterpriseId from URL
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the admins for the specific enterprise
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/get/admins?enterprise_id=${enterpriseId}`
        );
        if (!response.ok) throw new Error("Failed to fetch admins");
        const data = await response.json();
        setAdmins(data.admins);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [enterpriseId]); // Dependency on enterpriseId

  // Handle admin deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/admins/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete admin");

        // Remove the deleted admin from the state
        setAdmins((prev) => prev.filter((admin) => admin.id !== id));
        toast.success("Admin deleted successfully!"); // Notify success
      } catch (err) {
        toast.error(err.message); // Notify error
      }
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Admin Name',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Enterprise',
      selector: row => row.enterprise_name,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          <Link to={`/admins/edit/${row.id}`}>
            <button className="btn btn-outline-primary btn-rounded">Edit</button>
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-outline-danger btn-rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar />
        <div className="content">
          {/* Add Admin Button */}
          <Link
            className="btn-add"
            to={`/super/admin/add/enterprise/admin/${enterpriseId}`}
          >
            <i className="fas fa-plus"></i> Add New Admin
          </Link>
          <h2>Enterprise Admin List</h2>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <DataTable
              title="Admins"
              columns={columns}
              data={admins}
              pagination
              highlightOnHover
              pointerOnHover
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admins;
