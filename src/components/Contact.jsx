import React from "react";
import useContact from "../hooks/useContact";

export default function Contact({ token }) {
  const { dataContact, error } = useContact(token);

  return (
    <div className="font-raleway p-4">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p className="mb-4">Berikut adalah data yang masuk melalui API:</p>

      {/* Menampilkan error jika ada */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Menampilkan data dalam tabel */}
      {dataContact ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {dataContact.map((contact, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading data...</p> // Jika tidak ada error dan data masih loading
      )}
    </div>
  );
}
