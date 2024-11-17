import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useWhatWeDo = () => {
  const [dataWhatWeDo, setDataWhatWeDo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/what-we-do`);
      setDataWhatWeDo(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const postData = async (data, token) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/what-we-do`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, data, token) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/what-we-do/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id, token) => {
    try {
      await axios.delete(`${API_URL}/api/what-we-do/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataWhatWeDo, error, loading, postData, updateData, deleteData };
};

export default useWhatWeDo;
