import React, { useState, useRef } from "react";
import useWhatWeDo from "../hooks/useWhatWeDo";

export default function WhatWeDo({ token }) {
  const { dataWhatWeDo, error, loading, postData, updateData, deleteData } = useWhatWeDo();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const top = useRef(null);

  const scrollToTop = () => {
    if (top.current) {
      top.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleDelete = (id) => {
    deleteData(id, token);
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDesc(item.desc);
    setImageUrl(item.imageUrl);
    setEditId(item.id);
    setIsEdit(true);
    scrollToTop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", imageUrl);

    if (isEdit) {
      await updateData(editId, formData, token);
      setIsEdit(false);
      setEditId(null);
    } else {
      await postData(formData, token);
    }
    setTitle("");
    setDesc("");
    setImageUrl("");
  };

  return (
    <div className="font-raleway relative" ref={top}>
      <div>
        <h1 className="text-2xl font-bold mb-4">What We Do</h1>
        <p>Temukan layanan dan solusi yang kami tawarkan untuk kebutuhan Anda</p>

        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-end items-end gap-2 w-full py-10"
        >
          <div className="flex flex-col flex-grow">
            <label htmlFor="title" className="text-md font-bold mb-2">
              Title
            </label>
            <input
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-h-12 max-h-12 px-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="desc" className="text-md font-bold mb-2">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="min-h-12 max-h-24 px-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-md font-bold mb-2">
              Image <span className="font-light">(max: 1MB)</span>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className={`px-2 file file:right-0 ${isEdit ? "file:bg-peachred" : "file:bg-darkblue"} file:text-white file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer`}
            />
          </div>
          <button
            type="submit"
            className={`${isEdit ? "bg-peachred" : "bg-darkblue"} text-white px-4 rounded-lg min-h-12`}
          >
            {isEdit ? "Edit" : "Submit"}
          </button>
        </form>
      </div>

      {/* ERROR MESSAGE */}
      {error && <div className="text-red-500">{error}</div>}

      {/* TABEL DATA */}
      <h1 className="text-2xl font-bold mb-4">Data What We Do:</h1>

      {/* LAZY LOADING */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 w-12">No</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Preview</th>
              <th className="border border-gray-300 p-2 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataWhatWeDo.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 text-center">{index + 1}</td>
                <td className="border border-gray-300">{item.title}</td>
                <td className="border border-gray-300">{item.desc}</td>
                <td className="border border-gray-300 text-center">
                  <img
                    src={item.imageUrl}
                    alt="Preview"
                    className="h-24 w-auto mx-auto rounded-md shadow"
                  />
                </td>
                <td className="border border-gray-300 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-darkblue text-white px-4 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-peachred text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
