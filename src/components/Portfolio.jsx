import React, { useState, useRef } from "react";
import usePortfolio from "../hooks/usePortfolio";
import Button from "./Buttons/Button";

export default function Portfolio({ token }) {
  const { dataPortfolio, error, loading, postData, updateData, deleteData } = usePortfolio();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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

  const handleEdit = (portfolio) => {
    setTitle(portfolio.title);
    setContent(portfolio.content);
    setImageUrl(portfolio.imageUrl);
    setDate(portfolio.date);
    setEditId(portfolio.id);
    setIsEdit(true);
    scrollToTop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageUrl);
    formData.append("date", date);

    if (isEdit) {
      await updateData(editId, formData, token);
      setIsEdit(false);
      setEditId(null);
    } else {
      await postData(formData, token);
    }
    setContent("");
    setImageUrl("");
    setTitle("")
    setDate("")
  };

  return (
    <div className="font-raleway relative" ref={top}>
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
          <p>This is form input for Portfolio section.</p>
        </div>
        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-end items-end gap-2 w-full py-10"
        >
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
            <label htmlFor="name" className="text-md font-bold mb-2">
              Content
            </label>
            <textarea
              name="name"
              id="name"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-12 max-h-12 px-2 border border-gray-300 rounded-lg"
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
      <h1 className="text-2xl font-bold mb-4">Data Teams:</h1>
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
            {dataPortfolio.map((portfolio, index) => (
              <tr key={portfolio.id}>
                <td className="border border-gray-300">
                  <div className="flex justify-center">{index + 1}</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center items-center w-full my-2">
                    <div className="shadow-md rounded-lg flex justify-center items-center gap-4 p-2 overflow-hidden">
                      <div className="w-1/2 overflow-hidden">
                        <img
                          src={portfolio.imageUrl}
                          alt="Team"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-1/2 py-4">
                        <h1 className="text-lg text-peachred font-bold">
                          {portfolio.title}
                        </h1>
                        <h1 className="text-md mb-2">{portfolio.date}</h1>
                        <h1 className="text-md">{portfolio.content}</h1>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex flex-col justify-center items-center text-white gap-2 px-4">
                    <button
                      onClick={() => handleEdit(portfolio)}
                      className="bg-darkblue p-2 rounded-lg w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(portfolio.id)}
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
