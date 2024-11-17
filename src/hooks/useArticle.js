import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useArticle = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/api/article`);
      setDataArticle(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  const postData = async (data, token) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/article`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data submitted successfully:", response.data);
      await fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, data, token) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/article/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data updated successfully:", response.data);
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/article/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data deleted successfully:", response.data);
      await fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataArticle, error, loading, postData, updateData, deleteData };
};

export default useArticle;