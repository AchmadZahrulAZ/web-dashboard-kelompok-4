import React, { useState, useRef } from "react";
import useTeams from "../hooks/useTeams";

export default function AboutUs({ token }) {
  const { dataTeams, error, loading, postData, updateData, deleteData } = useTeams();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
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

  const handleEdit = (team) => {
    setTitle(team.title);
    setName(team.name);
    setImageUrl(team.imageUrl);
    setEditId(team.id);
    setIsEdit(true);
    scrollToTop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("image", imageUrl);

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
  };

  return (
    <div className="font-raleway relative" ref={top}>
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Teams</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-end items-end gap-2 w-full py-10"
        >
          <div className="flex flex-col flex-grow">
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
      <h1 className="text-2xl font-bold mb-4">Data Teams:</h1>
      {/* LAZY LOADING */}
      {loading ? (
        <div class="bg-peachred/[.05] shadow rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-12 py-1">
            <div class="h-2 bg-darkblue/[.5] rounded"></div>
            <div class="space-y-6">
              <div class="grid grid-cols-5 gap-4">
                <div class="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
                <div class="h-2 bg-darkblue/[.5] rounded col-span-3"></div>
                <div class="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
              </div>
              <div class="grid grid-cols-5 gap-4">
                <div class="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
                <div class="h-2 bg-darkblue/[.5] rounded col-span-3"></div>
                <div class="h-2 bg-darkblue/[.5] rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-darkblue/[.5] rounded"></div>
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
            {dataTeams.map((team, index) => (
              <tr key={team.id}>
                <td className="border border-gray-300">
                  <div className="flex justify-center">{index + 1}</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center items-center w-full my-2">
                    <div className="w-48 shadow-md min-h-60 rounded-lg overflow-hidden">
                      <div className="w-full h-36 overflow-hidden">
                        <img
                          src={team.imageUrl}
                          alt="Team"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center py-4">
                        <h1 className="text-lg text-peachred font-bold text-center">
                          {team.name}
                        </h1>
                        <h1 className="text-md">{team.title}</h1>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex flex-col justify-center items-center text-white gap-2 px-4">
                    <button
                      onClick={() => handleEdit(team)}
                      className="bg-darkblue p-2 rounded-lg w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
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
