// src/App.js
import React, { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import ProfileSettings from './component/SuperAdmin_Dashboard/ProfileSettings';
import { ToastContainer } from "react-toastify"; // Correct casing
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import SuperAdminDashboard from "./components/SuperAdmin_Dashboard/SuperAdminDashboard";
import AddAdminEnterprise from "./components/admins/AddAdminEnterprise";
import Admins from "./components/admins/Admins";
import EditAdmin from "./components/admins/EditAdmin";
// import EditEnterprise from "./components/enterprise/EditEnterprise";
import AddMember from "./components/admins/AddMember";
import Department from "./components/admins/Department";
import AddDepartment from "./components/admins/AddDepartment";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import Enterprise from "./components/enterprise/Enterprise";
import AddEnterprise from "./components/enterprise/AddEnterprise";
import AdminDashboard from "./components/admins/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
// import EditDepartment from "./components/admins/EditDepartment";
// import Employee from "./components/admins/EmployeeTable";
import AddEmployee from "./components/admins/AddEmployee";
import AddEmployees from "./components/chefs/AddEmployees";
import EditMember from "./components/admins/EditMember";
import Members from "./components/admins/Members";
import Vcard from './components/admins/Vcard';
import ChefDashboard from './components/chefs/ChefDashboard';
import EmployeeManagement from './components/chefs/EmployeeManagement';


const AppContent = () => {
  const navigate = useNavigate();
  const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

  const clearSession = useCallback(() => {
    localStorage.clear();
    navigate('/login');
    alert("You have been logged out due to inactivity");
  }, [navigate]);

  useEffect(() => {
    const handleInactivity = () => {
      clearSession();
    };

    let timeout = setTimeout(handleInactivity, SESSION_TIMEOUT);

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleInactivity, SESSION_TIMEOUT);
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, [clearSession, SESSION_TIMEOUT]);

  return (
    <>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Super Admin Routes */}
          <Route path="/super/admin/dashboard" element={<PrivateRoute element={<SuperAdminDashboard />} allowedRoles={['superadmin']} />} />
          <Route path="/super/admin/enterprises" element={<PrivateRoute element={<Enterprise />} allowedRoles={['superadmin']} />} />
          <Route path="/AddEnterprise" element={<PrivateRoute element={<AddEnterprise />} allowedRoles={['superadmin']} />} />
          <Route path="/super/admin/add/enterprise/admin/:enterpriseId" element={<PrivateRoute element={<AddAdminEnterprise />} allowedRoles={['superadmin']} />}/>
          <Route path="/register" element={<PrivateRoute element={<Register />} allowedRoles={['superadmin']} />} />
          <Route path="enterprise/:enterpriseId/super/admin/admins" element={<PrivateRoute element={<Admins />} allowedRoles={['superadmin']} />}/>
          <Route path="enterprise/:enterpriseId/admins/edit/:id" element={<PrivateRoute element={<EditAdmin />} allowedRoles={['superadmin']} />} />
          {/* <Route path="/enterprise/edit/:id" element={<PrivateRoute element={<EditEnterprise />} allowedRoles={['superadmin']} />}/> */}
          <Route path="/forgot-password" element={<PrivateRoute element={<ForgotPassword />} allowedRoles={['superadmin']} />}/>
          <Route path="/reset_password/:id/:token" element={<PrivateRoute element={<ResetPassword />} allowedRoles={['superadmin']} />}/>
          
          {/* Admin & SuperAdmin Routes */}
          <Route path="/enterprise/:enterpriseId/departments" element={<PrivateRoute element={<Department />} allowedRoles={['admin', 'superadmin']} />} />
          <Route path="/departments/:enterpriseId/create" element={<PrivateRoute element={<AddDepartment />} allowedRoles={['admin', 'superadmin']} />} />
          {/* <Route path="/enterprise/:enterpriseId/departments/:departmentId/edit" element={<PrivateRoute element={<EditDepartment />} allowedRoles={['admin', 'superadmin']} />} /> */}

          <Route path="/enterprise/:enterpriseId/departments/:departmentId/chef/create" element={<PrivateRoute element={<AddMember />} allowedRoles={['admin', 'superadmin']} />} />
          <Route path="enterprise/:enterpriseId/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin','superadmin']} />}/>
          <Route path="/enterprise/:enterpriseId/department/:departmentId/chef/:chefId/dashboard" element={<PrivateRoute element={<ChefDashboard />} allowedRoles={['admin', 'superadmin', 'chef']} />} />
        
          <Route
  path="/enterprise/:enterpriseId/department/:departmentId/employees"
  element={
    <PrivateRoute
      element={<EmployeeManagement />}
      allowedRoles={['admin', 'superadmin', 'chef']}
    />
  }
/>

          <Route path="/enterprise/:enterpriseId/chefs" element={<PrivateRoute element={<Members />} allowedRoles={['admin','superadmin','chef']} />}/>
          <Route path="/enterprise/:enterpriseId/chef/:chefId/edit" element={<PrivateRoute element={<EditMember />} allowedRoles={['admin','superadmin']} />}/>
          <Route path="enterprise/:enterpriseId/chef/:chefId/department/:departmentId/create/employee" element={<PrivateRoute element={<AddEmployee />} allowedRoles={['admin','superadmin', 'chef']} />}/>
          <Route path="enterprise/:enterpriseId/department/:departmentId/create/employee" element={<PrivateRoute element={<AddEmployees />} allowedRoles={['admin','superadmin', 'chef']} />}/>
{/*       
      <Route
  path="/enterprise/:enterpriseId/department/:departmentId/employees"
  element={<PrivateRoute element={<EmployeeTable />} allowedRoles={['admin', 'superadmin']} />}
/> */}
 
      
<Route path="/employee/vcard/:employeeId" element={<Vcard />} />
   

          {/* <Route path="/profile" element={<ProfileSettings />} /> */}
          {/* <Route path="/employee/vcard/:employeeId" element={<PrivateRoute element={<Vcard />} allowedRoles={['admin','superAdmin', 'chef']} />}/> */}
          <Route path="/admin/dashboard/:enterpriseId" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin', 'superadmin']} />} />

          {/* SuperAdmin & Admin & Chef Routes Routes */}
        
      </Routes>
      <ToastContainer />
      </>
  );
};

const App = () => ( 
  <Router>
    <AppContent />
  </Router>
);
export default App;