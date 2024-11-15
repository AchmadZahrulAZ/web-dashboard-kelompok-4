import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar component
import { logout } from "../utils/api"; // Import logout function from API
import { useState } from "react"; // Import useState for local state management

const Dashboard = ({ token, setToken }) => {
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track errors

  const handleLogout = () => {
    setLoading(true); // Set loading state to true when logging out
    logout(token) // Call logout API with the token
      .then(() => {
        setToken(null); // Clear token in state
        localStorage.removeItem("token"); // Remove token from localStorage
      })
      .catch((err) => {
        setError(err.message); // Set error state if an error occurs
      })
      .finally(() => {
        setLoading(false); // Stop loading state
      });
  };

  return (
    <div>
      <Navbar logout={handleLogout} loading={loading} /> {/* Pass logout function and loading state */}
      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}
    </div>
  );
};

export default Dashboard;
