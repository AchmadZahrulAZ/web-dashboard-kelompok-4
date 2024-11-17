import { useState, useEffect } from "react";
import axios from "axios";

// URL API diambil dari environment variable
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Hook untuk mengelola data Subscribe Email.
 */
const useSubscribeEmailUs = (token) => {
  const [dataSubscribeEmail, setDataSubscribeEmail] = useState(null); // Data yang diterima dari API
  const [error, setError] = useState(null); // Menyimpan pesan error jika ada

  /**
   * Fungsi untuk mengambil data dari API.
   */
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/subscribe`, {
        headers: {
          // Header Authorization ditambahkan untuk autentikasi
          Authorization: `Bearer ${token}`,
        },
      });
      setDataSubscribeEmail(response.data.data); // Simpan data yang diterima
    } catch (error) {
      console.error("Error fetching data:", error); // Cetak error di console untuk debugging
      setError(error.response?.data?.message || error.message); // Simpan pesan error
    }
  };

  /**
   * Hook untuk mengambil data saat komponen pertama kali dimuat.
   */
  useEffect(() => {
    if (token) {
      fetchData(); // Panggil fungsi fetchData jika token tersedia
    } else {
      setError("Token tidak tersedia. Harap login untuk mendapatkan akses.");
    }
  }, [token]);

  return { dataSubscribeEmail, error }; // Kembalikan data dan error agar dapat digunakan di komponen lain
};

export default useSubscribeEmailUs;
