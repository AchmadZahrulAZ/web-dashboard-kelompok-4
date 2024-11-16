import React, { useState, useEffect } from "react"; // Import React and hooks
import DOMPurify from "dompurify"; // Import DOMPurify to sanitize input
import LoginModal from "../components/LoginModal"; // Import LoginModal component
import { login, register } from "../utils/api"; // Import API functions for login and registration
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"

const Login = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register mode
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "", // Only used for registration
    role: "", // Only used for registration
  });
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [error, setError] = useState(null); // State to hold error messages

  // Toggle between Login and Register forms
  const toggleLogin = () => {
    setIsLogin((prevLogin) => !prevLogin);
    setError(null); // Clear any existing error
  };

  // If a token exists in localStorage, set it in the state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token); // Set token state
    }
  }, [setToken]);

  // Update form state when input fields change
  const handleChange = (e) => {
    // Sanitize the input to prevent XSS attacks
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    
    setForm({
      ...form,
      [e.target.name]: sanitizedValue, // Update form state with sanitized value
    });
  };

  // Handle form submission for login or registration
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading state
    setError(null); // Clear previous errors

    // Choose API action based on isLogin state
    const authAction = isLogin ? login : register;

    // Prepare data for submission based on whether it's login or registration
    const formData = isLogin
      ? { username: form.username, password: form.password }
      : { username: form.username, password: form.password, name: form.name, role: form.role };

    authAction(formData) // Call appropriate API function
      .then((res) => {
        if (isLogin) {
          const token = res.token;
          localStorage.setItem("token", token); // Store token in localStorage
          setToken(token); // Set token in parent component's state
        } else {
          alert("Register success"); // Notify user about successful registration
          setIsLogin(true); // Switch back to Login form
        }
        // Reset form state after successful submission
        setForm({
          username: "",
          password: "",
          name: "",
          role: "",
        });
        setError(null); // Clear error
      })
      .catch((err) => {
        // Handle errors from API
        if (err.response && err.response.data.errors) {
          const errorMessages = err.response.data.errors.map((error) => error.msg); // Extract error messages from response
          setError(errorMessages); // Set errors in state
        } else if (err.response && err.response.data.message) {
          setError([err.response.data.message]); // Set single error message
        } else {
          setError(["An error occurred"]); // Generic error message
        }
      })
      .finally(() => {
        setLoading(false); // Stop loading state
      });
  };

  return (
    <div>
      {/* Pass props to the LoginModal component */}
      <LoginModal
        form={form}
        loading={loading}
        error={error}
        handleChange={handleChange}
        isLogin={isLogin}
        toggleLogin={toggleLogin}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
