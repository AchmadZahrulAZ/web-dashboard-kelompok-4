import React, { useEffect, useState } from "react";
import { aboutGet } from "../hooks/useAbout";

export default function AboutUs() {
  const [data, setData] = useState(null); // State untuk menyimpan data (null jika belum diambil)
  const [error, setError] = useState(null); // State untuk menyimpan error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await aboutGet(); // Panggil fungsi aboutGet
        setData(result); // Simpan data ke state
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Simpan error ke state
      }
    };
    
    fetchData(); // Panggil fungsi fetchData
  }, []);

  return (
    <div className="overflow-x-auto">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">About Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        <form className="flex justify-center items-end gap-2 w-full py-10">
          {/* Form input untuk menambahkan data */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-md font-bold mb-2">Title</label>
            <input type="text" className="border border-gray-300 min-h-12 rounded-lg" name="title" id="title" />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="description" className="text-md font-bold mb-2">Description</label>
            <textarea type="text" style={{resize: "none"}} name="description" id="description" className="min-h-12 max-h-12 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-md font-bold mb-2">Image</label>
            <div className="flex justify-center items-center border border-gray-300 rounded-lg min-h-12">
              <input type="file" name="image" id="image" className="px-2 file file:right-0 file:bg-darkblue file:text-white file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer" />
            </div>
          </div>
          <button type="submit" className="bg-darkblue text-white px-2 rounded-lg min-h-12">Submit</button>
        </form>
      </div>
      {error && <div className="text-red-500">{error}</div>} {/* Tampilkan error jika ada */}
      {data && ( // Pastikan data ada sebelum mencoba mengaksesnya
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Images</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">{data.title}</td> {/* Akses langsung properti dari objek */}
              <td className="border border-gray-300 px-4 py-2">{data.desc}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={data.imageUrl} alt={data.title} className="w-20 h-20 object-cover" />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}