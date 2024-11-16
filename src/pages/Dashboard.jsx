import Navbar from "../components/Navbar"; // Import Navbar component
import { logout } from "../utils/api"; // Import logout function from API
import React, { useState } from "react"; // Import useState for local state management
import Sidebar from "../components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "../components/AboutUs";
import Home from "../components/Home";
import Contact from "../components/Contact";
import SubscribeEmail from "../components/SubscribeEmail";

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
    console.log(token); // Log token from localStorage
  };

  return (
    <Router>
      <Navbar logout={handleLogout} loading={loading} /> {/* Pass logout function and loading state */}
      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}
      <div className="flex justify-between items-start">
        <Sidebar />
        <div className="flex flex-col w-full justify-center px-16 py-6 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs token={token} />} />
            <Route path="/contact" element={<Contact token={token} />} />
            <Route path="/subscribe" element={<SubscribeEmail token={token} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
