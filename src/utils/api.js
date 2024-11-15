import axios from "axios"; // Import axios for making HTTP requests

const API_URL = import.meta.env.VITE_API_URL; // API base URL from environment variables

// Function to handle login
export const login = async (data) => {
  const res = await axios.post(`${API_URL}/api/login`, data, {
    headers: {
      "Content-Type": "application/json", // Set content type for the request
    },
  });
  return res.data; // Return the response data
};

// Function to handle registration
export const register = async (data) => {
  const res = await axios.post(`${API_URL}/api/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// Function to handle logout
export const logout = async (token) => {
  const res = await axios.post(
    `${API_URL}/api/logout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    }
  );
  return res.data;
};
