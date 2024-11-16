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

  const postData = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/about-us`, data)
      console.log("Data submitted successfully:", response.data);
      await fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await axios.put(`${API_URL}/api/about-us`, data)
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