import React from "react";
import useSubscribeEmailUs from "../hooks/useSubscribeEmail";

/**
 * Komponen untuk menampilkan daftar email yang telah dikirimkan.
 * @param {string} token - Token autentikasi yang diterima dari user atau sistem.
 */
export default function SubscribeEmail({ token }) {
  const { dataSubscribeEmail, error } = useSubscribeEmailUs(token); // Gunakan hook untuk mengambil data

  return (
    <div className="font-raleway">
      <div>
        <h1 className="text-2xl font-bold mb-4">Daftar Email</h1>
        <p>
          Berikut adalah daftar email yang telah dikirimkan melalui sistem kami.
        </p>
      </div>

      {/* Jika ada error, tampilkan pesan error */}
      {error && <div className="text-red-500">Error: {error}</div>}

      {/* Tampilkan data dalam bentuk tabel jika tersedia */}
      {dataSubscribeEmail ? (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {dataSubscribeEmail.map((email, index) => (
              <tr key={email.id}>
                <td className="border border-gray-300 p-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2">{email.email}</td>
                <td className="border border-gray-300 p-2">{email.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Jika tidak ada data, tampilkan pesan
        <p className="mt-4">Belum ada email yang terkirim.</p>
      )}
    </div>
  );
}
