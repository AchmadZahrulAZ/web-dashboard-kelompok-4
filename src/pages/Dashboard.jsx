import Navbar from "../components/Navbar"; // Import Navbar component
import { logout } from "../utils/api"; // Import logout function from API
import React, { useState } from "react"; // Import useState for local state management
import Sidebar from "../components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "../components/AboutUs";
import Article from "../components/Article"
import Home from "../components/Home";
import Teams from "../components/Teams"
import Testimonial from "../components/Testimonial";
import Expertise from "../components/Expertise";
import Contact from "../components/Contact";
import SubscribeEmail from "../components/SubscribeEmail";

const Dashboard = ({ token, setToken, username }) => {
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track errors
  const [showSidebar, setShowSidebar] = useState(false); // State to track sidebar visibility

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

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar); // Toggle sidebar visibility
  };

  return (
    <Router>
      <Navbar username={username} logout={handleLogout} loading={loading} onClick={handleHamburgerClick}/> {/* Pass logout function and loading state */}
      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}
      <div className="flex lg:justify-between justify-center items-start">
        <Sidebar showSidebar={showSidebar} /> {/* Pass showSidebar state */}
        <div className="flex flex-col w-full justify-center px-4 lg:px-16 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs token={token} />} />
            <Route path="/article" element={<Article token={token} />} />
            <Route path="/teams" element={<Teams token={token} />} />
            <Route path="/testimonial" element={<Testimonial token={token} />} />
            <Route path="/expertise" element={<Expertise token={token} />} />
            <Route path="/contact" element={<Contact token={token} />} />
            <Route path="/subscribe" element={<SubscribeEmail token={token} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
