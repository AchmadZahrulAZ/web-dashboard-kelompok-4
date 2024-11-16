import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Pastikan variabel ini dikonfigurasi dengan benar

const useContact = (token) => {
  const [dataContact, setDataContact] = useState(null);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data contact dari API
  const fetchData = async () => {
    try {
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const response = await axios.get(`${API_URL}/api/contact`, {
        headers: {
          Authorization: `Bearer ${token}`, // Header otorisasi
        },
      });

      setDataContact(response.data.data);
    } catch (error) {
      // Penanganan error yang lebih detail
      if (error.response) {
        console.error("Error dari server:", error.response.status, error.response.data);
        if (error.response.status === 401) {
          setError("Unauthorized: Token tidak valid atau sudah kadaluarsa.");
        } else {
          setError(error.response.data.message || "Terjadi kesalahan pada server.");
        }
      } else if (error.request) {
        console.error("Tidak ada respons dari server:", error.request);
        setError("Tidak dapat terhubung ke server. Cek koneksi Anda.");
      } else {
        console.error("Error lainnya:", error.message);
        setError(error.message);
      }
    }
  };

  // Memanggil fetchData saat komponen pertama kali dimuat
  useEffect(() => {
    fetchData();
  }, []);

  return { dataContact, error };
};

export default useContact;
