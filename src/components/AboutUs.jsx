import React, { useState } from "react";
import useAboutUs from "../hooks/useAbout";
import Button from "./Buttons/Button";

export default function AboutUs({token}) {
  const { dataAbout, error, postData, updateData } = useAboutUs();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
   setImageUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", imageUrl);

    await postData(formData, token);
    await updateData(formData, token);
  };

  return (
    <div className="font-raleway">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">About Us</h1>
          <p>This is form input for About Us section.</p>
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
              className="border border-gray-300 min-h-12 rounded-lg"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="min-h-12 max-h-12 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-md font-bold mb-2">
              Image
            </label>
            <div className="flex justify-center items-center border border-gray-300 rounded-lg min-h-12">
              <input
                type="file"
                name="image"
                id="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                className="px-2 file file:right-0 file:bg-darkblue file:text-white file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
              />
            </div>
          </div>
          {/* sUBMIT BUTTON */}
          <Button type="submit" text="Submit" className={"bg-darkblue"} />
        </form>
      </div>
      {/* ERROR MESSAGE */}
      {error && <div className="text-red-500">{error}</div>}
      {/* PREVIEW */}
      <h1 className="text-2xl font-bold mb-4">Preview:</h1>
      {dataAbout && (
        <div>
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
