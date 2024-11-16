import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useAboutUs = () => {
  const [dataAbout, setDataAbout] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/about-us`);
      setDataAbout(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  const postData = async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/about-us`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data submitted successfully:", response.data);
      await fetchData();
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:");
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      setError(error.response?.data?.message || error.message);
    }
  };

  const updateData = async (data, token) => {
    try {
      const response = await axios.put(`${API_URL}/api/about-us`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data updated successfully:", response.data);
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataAbout, error, postData, updateData };
};

export default useAboutUs;