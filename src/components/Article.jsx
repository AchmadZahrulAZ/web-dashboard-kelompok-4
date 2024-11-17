import React, { useState, useRef } from "react";
import useArticle from "../hooks/useArticle";
import Button from "./Buttons/Button";

export default function Article({ token }) {
  const { dataArticle, error, loading, postData, updateData, deleteData } = useArticle();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaTag, setMetaTag] = useState([""]);
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

  const handleEdit = (article) => {
    setTitle(article.title);
    setWriter(article.writer);
    setImageUrl(article.imageUrl);
    setContent(article.content);
    setDate(article.date);
    setMetaTitle(article.meta_title);
    setMetaDesc(article.meta_desc);
    setMetaTag(article.meta_tag);
    setEditId(article.id);
    setIsEdit(true);
    scrollToTop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("writer", writer);
    formData.append("image", imageUrl);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("meta_title", metaTitle);
    formData.append("meta_desc", metaDesc);
    
    metaTag.forEach(tag => {
        formData.append("meta_tag[]", tag); // Menambahkan setiap tag ke formData dengan nama yang sama
    });

    if (isEdit) {
      await updateData(editId, formData, token);
      setIsEdit(false);
      setEditId(null);
    } else {
      await postData(formData, token);
    }
    setWriter("");
    setImageUrl("");
    setTitle("")
    setDate("");
    setContent("");
    setMetaTitle("");
    setMetaDesc("");
    setMetaTag([""]);
  };

  return (
    <div className="font-raleway relative" ref={top}>
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Article</h1>
          <p>Jelajahi wawasan, tips, dan informasi terkini melalui artikel kami</p>
        </div>
        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-4 gap-4 w-full py-10"
        >
          <div className="flex flex-col">
            <label htmlFor="writer" className="text-md font-bold mb-2">
              Writer
            </label>
            <input
              name="writer"
              id="writer"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
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
          <div className="flex flex-col col-span-2">
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
          <div className="flex flex-col col-span-3">
            <label htmlFor="content" className="text-md font-bold mb-2">
              Content
            </label>
            <textarea
              type="text"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
            <label htmlFor="meta_title" className="text-md font-bold mb-2">
              Meta Title
            </label>
            <input
              type="text"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="meta_title"
              id="meta_title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="meta_desc" className="text-md font-bold mb-2">
              Meta Description
            </label>
            <input
              type="text"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="meta_desc"
              id="meta_desc"
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="meta_tag" className="text-md font-bold mb-2">
              Meta Tag
            </label>
            <input
              type="text"
              className="border border-gray-300 px-2 min-h-12 rounded-lg"
              name="meta_tag"
              id="meta_tag"
              value={metaTag.join(", ")} // Menampilkan tag sebagai string
              onChange={(e) => setMetaTag(e.target.value.split(",").map(tag => tag.trim()))} // Mengubah input menjadi array
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div class="grid grid-cols-subgrid gap-4 col-span-4">
            <div className="col-start-4 text-right">
                <Button type="submit" text={isEdit ? "Edit" : "Submit"} className={isEdit ? "bg-peachred" : "bg-darkblue"} />
            </div>
          </div>
        </form>
      </div>
      {/* ERROR MESSAGE */}
      {error && <div className="text-red-500">{error}</div>}
      {/* TABEL DATA */}
      <h1 className="text-2xl font-bold mb-4">Data Article:</h1>
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
            {dataArticle.map((article, index) => (
              <tr key={article.id}>
                <td className="border border-gray-300">
                  <div className="flex justify-center">{index + 1}</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center items-center w-full my-2">
                    <div className="shadow-md h-60 p-2 w-full flex justify-center items-center gap-4 rounded-lg overflow-hidden">
                      <div className="w-full max-w-60 min-w-60 overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt="Article"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start py-4">
                        <h1 className="text-lg text-peachred font-bold">{article.title}</h1>
                        <h1 className="text-sm">{article.date}</h1>
                        <h1 className="text-sm">Writer: {article.writer}</h1>
                        <div className="max-h-32 overflow-y-auto">
                            <h1 className="text-base">{article.content}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-base text-peachred">Meta:</div>
                  <div className="text-base text-peachred">Title: {article.meta_title}; Description: {article.meta_desc}; Tag: {article.meta_tag}</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex flex-col justify-center items-center text-white gap-2 px-4">
                    <button
                      onClick={() => handleEdit(article)}
                      className="bg-darkblue p-2 rounded-lg w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
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
