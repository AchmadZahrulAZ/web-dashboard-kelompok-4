import React from "react";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page component
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import { useState } from "react"; // Import useState hook to manage state

const App = () => {
  const [token, setToken] = useState(null); // State to hold the authentication token
  const [username, setUsername] = useState(""); // State to hold the username
  const [name, setName] = useState(""); // State to hold the name
  const [password, setPassword] = useState(""); // State to hold the password

  // If token exists, render the Dashboard page; else, render the Login page
  return token ? (
    <Dashboard token={token} setToken={setToken} username={username} name={name} password={password} />
  ) : (
    <LoginPage setToken={setToken} setUsername={setUsername} setName={setName} setPassword={setPassword} />
  );
};

export default App;
