import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "../components/AboutUs";
import Home from "../components/Home";

export default function Dashboard() {
  return (
    <Router>
          <Navbar />
      <div className="flex justify-between items-start">
        <Sidebar />
        <div className="flex flex-col w-full justify-center px-16 py-6 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
