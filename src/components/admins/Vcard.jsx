import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Vcard.css";
import { MdSaveAlt } from "react-icons/md";
import BASE_URL from '../config';
const isContactsApiSupported = () => 'contacts' in navigator && 'ContactsManager' in window;

const Vcard = () => {
  const { employeeId } = useParams();
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/employee/vcard/${employeeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


//   const handleSave = async () => {
//     if (!employee) return;

//     const { employee: empData, enterprise, department } = employee;

//     if (isContactsApiSupported()) {
//       const props = ['name', 'email', 'tel', 'address', 'icon'];
//       const opts = { multiple: false };

//       try {
//         const contacts = await navigator.contacts.select(props, opts);
//         const contact = contacts[0];

//         contact.name = [empData.name];
//         contact.email = [empData.email];
//         contact.tel = [empData.phone_number];
//         contact.address = [{
//           streetAddress: enterprise.geographical_location,
//           addressLocality: department.name
//         }];

//         if (empData.image) {
//           try {
//             const response = await fetch( `${BASE_URL}/uploads/employees/${empData.image}`);
//             const blob = await response.blob();
//             contact.icon = [blob];
//           } catch (error) {
//             console.error("Error fetching the employee image:", error);
//           }
//         }

//         await navigator.contacts.update(contact);
//         alert("Contact saved successfully!");
//       } catch (error) {
//         console.error("Error saving contact:", error);
//         alert("Failed to save contact. Your device may not support this feature.");
//       }
//     } else {
//       alert("Your device does not support saving contacts directly. The contact will be downloaded as a vCard.");
      
//       const vCardContent = `BEGIN:VCARD
// VERSION:3.0
// FN:${empData.name}
// TITLE:${empData.job_title}
// EMAIL:${empData.email}
// TEL;TYPE=CELL:${empData.phone_number}
// ORG:${enterprise.name}
// URL:${enterprise.website}
// ADR:${enterprise.geographical_location};${department.name}
// END:VCARD`;

//       const blob = new Blob([vCardContent], { type: "text/vcard" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${empData.name}.vcf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     }
//   };

  const handleSave = async () => {
    if (!employee) return;
  
    const { employee: empData, enterprise, department } = employee;
    const vcardUrl = `${BASE_URL}/employee/vcard/${employeeId}`;
  
    if (!isContactsApiSupported()) {
      alert("Your device does not support saving contacts directly. The contact will be downloaded as a vCard.");
  
      const vCardContent = `BEGIN:VCARD
  VERSION:3.0
  FN:${empData.name}
  TITLE:${empData.job_title}
  EMAIL:${empData.email}
  TEL;TYPE=CELL:${empData.phone_number}
  ORG:${enterprise.name}
  URL:${enterprise.website}
  ADR:${enterprise.geographical_location};${department.name}
  NOTE:View full details at ${vcardUrl}
  END:VCARD`;
  
      const blob = new Blob([vCardContent], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${empData.name}.vcf`;
      a.click();
      URL.revokeObjectURL(url);
    } 
  };

  const { employee: empData, enterprise, department } = employee;


  

  return (
    <div className="vcard-container">
      <div className="vcard">
        <div className="item-container template-1">
          <div className="item-header">
            <div className="item-background">
              <div className="logoContainer">
              {enterprise && (
          <img
            src={`/Images/${enterprise.image}`}
            alt={enterprise.name}
          />
        )}

               
                {/* <img
                  alt="Logo"
                  src="/assets/INQ-logo-12.png"
                /> */}
              </div>
            </div>
            <h6 id="vcardName" className="text-black card-title">
              {empData.name}
            </h6>
            <p id="vcardJobTitle" className="text-black card-subtitle">
              {empData.job_title}
            </p>
            <hr className="divider" />
            <div className="employee-image-container">
            {empData && empData.image ? (
  <img
    src={`/uploads/employees/${empData.image}`} // Image path provided by the backend
    alt={empData.name}
    className="employee-image"
  />
) : (
  <p>No image available for this employee.</p>
)}


{/* <img
    src={`http://localhost:5000/uploads/employees/${empData.image}`}
    alt={empData.name}
    className="employee-image"
/> */}

            </div>

            <hr className="divider" />
            <p>
              <strong>Email:</strong>{" "}
              <span id="vcardEmail">{empData.email}</span>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <span id="vcardPhoneMobile">{empData.phone_number}</span>
            </p>
            <div className="vcard-functions">
              <a href={`tel:${empData.phone_number}`}>
                <i className="fas fa-phone-alt"></i> Phone
              </a>
              <a href={`mailto:${empData.email}`}>
                <i className="fas fa-envelope"></i> Email
              </a>
              <a
                href={`http://${enterprise.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe"></i> Website
              </a>
            </div>
            <div className="item-body mt-3">
            <div className="content-2">
                <p>
                  
                    <i className="fas fa-building mr-3"></i>
                    <strong>Enterprise:</strong>{" "}
                    <span id="vcardPhoneWork">{enterprise.name}</span>
                 
                </p>
              </div>
              <div className="content-2">
                <p>
                  <a href={`tel:${enterprise.contact}`}>
                    <i className="fas fa-phone-alt mr-3"></i>
                    <strong>Phone(work):</strong>{" "}
                    <span id="vcardPhoneWork">{enterprise.contact}</span>
                  </a>
                </p>
              </div>
              <div className="content-2">
                <p>
                  <a
                    href={`http://${enterprise.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe mr-3"></i>
                    <strong>Website:</strong>{" "}
                    <span id="vcardWebsite">{enterprise.website}</span>
                  </a>
                </p>
              </div>
              <div className="content-2">
                <p>
                  <Link>
                    <i className="fas fa-map-marker-alt mr-3"></i>
                    <strong>Department:</strong>{" "}
                    <span id="vcardAddress">{department.name}</span>
                  </Link>
                </p>
              </div>
              <div className="content-2">
                <p>
                  <Link>
                    <i className="fas fa-road mr-3"></i>
                    <strong>Street:</strong>{" "}
                    <span id="vcardStreet">
                      {enterprise.geographical_location}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Floating button */}
        <button className="floating-button" onClick={handleSave}>
          <MdSaveAlt />
        </button>
      </div>
    </div>
  );
};

export default Vcard;
