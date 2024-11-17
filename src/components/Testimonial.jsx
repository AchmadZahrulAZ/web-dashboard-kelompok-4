import React, { useState, useRef } from "react";
import useTestimonial from "../hooks/useTestimonial";
import Button from "./Buttons/Button";

export default function AboutUs({ token }) {
  const { dataTestimonial, error, loading, postData, updateData, deleteData } = useTestimonial();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
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

  const handleEdit = (testimoni) => {
    setTitle(testimoni.title);
    setName(testimoni.name);
    setImageUrl(testimoni.imageUrl);
    setMessage(testimoni.message);
    setDate(testimoni.date);
    setEditId(testimoni.id);
    setIsEdit(true);
    scrollToTop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("image", imageUrl);
    formData.append("message", message);
    formData.append("date", date);

    if (isEdit) {
      await updateData(editId, formData, token);
      setIsEdit(false);
      setEditId(null);
    } else {
      await postData(formData, token);
    }
    setName("");
    setImageUrl("");
    setTitle("")
    setDate("");
    setMessage("");
  };

  return (
    <div className="font-raleway relative" ref={top}>
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Testimonial</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-end items-end gap-2 w-full py-10"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-md font-bold mb-2">
              Name
            </label>
            <input
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-12 max-h-12 px-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-md font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="message" className="text-md font-bold mb-2">
              Message
            </label>
            <input
              type="text"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="text-md font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-md font-bold mb-2">
              Image <span className="font-light">(max: 1MB)</span>
            </label>
            <div className="flex justify-center items-center border border-gray-300 rounded-lg min-h-12">
              <input
                type="file"
                name="image"
                id="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                className={`px-2 file file:right-0 ${isEdit ? "file:bg-peachred" : "file:bg-darkblue"} file:text-white file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer`}
              />
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <Button type="submit" text={isEdit ? "Edit" : "Submit"} className={isEdit ? "bg-peachred" : "bg-darkblue"} />
        </form>
      </div>
      {/* ERROR MESSAGE */}
      {error && <div className="text-red-500">{error}</div>}
      {/* TABEL DATA */}
      <h1 className="text-2xl font-bold mb-4">Data Testimonial:</h1>
      {/* LAZY LOADING */}
      {loading ? (
        <div className="bg-peachred/[.05] shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-12 py-1">
            <div className="h-2 bg-darkblue/[.5] rounded"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-4">
                <div className="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
                <div className="h-2 bg-darkblue/[.5] rounded col-span-3"></div>
                <div className="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div className="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
                <div className="h-2 bg-darkblue/[.5] rounded col-span-3"></div>
                <div className="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-darkblue/[.5] rounded"></div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 w-12">No</th>
              <th className="border border-gray-300 p-2">Preview</th>
              <th className="border border-gray-300 p-2 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataTestimonial.map((testimoni, index) => (
              <tr key={testimoni.id}>
                <td className="border border-gray-300">
                  <div className="flex justify-center">{index + 1}</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center items-center w-full my-2">
                    <div className="w-48 shadow-md min-h-60 rounded-lg overflow-hidden">
                      <div className="w-full h-36 overflow-hidden">
                        <img
                          src={testimoni.imageUrl}
                          alt="testimoni"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center py-4">
                        <h1 className="text-lg text-peachred font-bold text-center">
                          {testimoni.name}
                        </h1>
                        <h1 className="text-base">{testimoni.title}</h1>
                        <h1 className="text-sm">{testimoni.date}</h1>
                        <h1 className="text-base text-center">&quot;{testimoni.message}&quot;</h1>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex flex-col justify-center items-center text-white gap-2 px-4">
                    <button
                      onClick={() => handleEdit(testimoni)}
                      className="bg-darkblue p-2 rounded-lg w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimoni.id)}
                      className="bg-peachred p-2 rounded-lg w-full"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
