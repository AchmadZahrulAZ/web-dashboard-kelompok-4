import React, { useState } from "react";
import useAboutUs from "../hooks/useAbout";

export default function AboutUs() {
  const { dataAbout, error, postData, updateData } = useAboutUs();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    imageUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      imageUrl: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, desc, imageUrl } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("desc", desc);
    if (imageUrl) {
      formDataToSend.append("imageUrl", imageUrl);
    }

    const token = localStorage.getItem("token");

    await postData(formDataToSend, token);
  };

  return (
    <div className="font-raleway">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">About Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-end gap-2 w-full py-10"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-md font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              className="border border-gray-300 min-h-12 rounded-lg"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="desc" className="text-md font-bold mb-2">
              Description
            </label>
            <textarea
              style={{ resize: "none" }}
              name="desc"
              id="desc"
              value={formData.desc}
              onChange={handleChange}
              className="min-h-12 max-h-12 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-md font-bold mb-2">
              Image
            </label>
            <div className="flex justify-center items-center border border-gray-300 rounded-lg min-h-12">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="imageUrl"
                id="imageUrl"
                onChange={handleFileChange}
                className="px-2 file file:right-0 file:bg-darkblue file:text-white file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
              />
            </div>
          </div>
          {/* sUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-darkblue text-white px-2 rounded-lg min-h-12"
          >
            {dataAbout ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      {/* ERROR MESSAGE */}
      {error && <div className="text-red-500">{error}</div>}
      {/* PREVIEW */}
      {dataAbout && (
        <div>
          <h1 className="text-xl font-bold">Preview:</h1>
          <div className="flex justify-center items-center gap-4 py-10">
            <div className="w-96 h-auto rounded-lg overflow-hidden">
              <img src={dataAbout.imageUrl} alt="About Us" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-darkblue text-4xl font-bold">
                {dataAbout.title}
              </h1>
              <p>{dataAbout.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
