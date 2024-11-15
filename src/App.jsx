import React from "react";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page component
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import { useState } from "react"; // Import useState hook to manage state

const App = () => {
  const [token, setToken] = useState(null); // State to hold the authentication token

  // If token exists, render the Dashboard page; else, render the Login page
  return token ? (
    <Dashboard token={token} setToken={setToken} />
  ) : (
    <LoginPage setToken={setToken} />
  );
};

export default App;
