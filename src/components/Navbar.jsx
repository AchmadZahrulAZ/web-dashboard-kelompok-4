import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ logout, loading, onClick, username, showSidebar }) {
  return (
    <nav>
      <div className="px-6 py-8">
        <div className="fixed z-10 top-0 left-0 py-4 px-6 bg-white/[.3] backdrop-blur-sm w-full flex justify-between items-center">
        <div className="flex items-center">
            <button className="lg:hidden block mr-4 text-xl" onClick={onClick}>
                {showSidebar ? <i class="bi bi-x-lg"></i> : <i class="bi bi-list"></i>}
            </button>
          <h1 className="text-xl font-bold mb-0">LOGO</h1>
        </div>
          <ul className="flex justify-center items-center mb-0 gap-2">
            <li>
              <button className="border-2 border-white p-2 rounded-md hover:border-darkblue">
                <i class="bi bi-brightness-high-fill"></i>
              </button>
            </li>
            <li>
              <button className="border-2 border-white p-2 rounded-md hover:border-darkblue">
                EN
              </button>
            </li>
            <li className="relative group px-2">
              <div className="h-10 w-10 flex justify-center items-center rounded-full border-2 border-white group-hover:border-darkblue/[.3] bg-peachred trasition-all duration-300">
                <i className="bi bi-person-circle scale-150 text-white"></i>
              </div>
              <div className="absolute z-50 top-10 right-0 bg-white min-w-56 shadow-lg rounded-md p-4 hidden group-hover:flex flex-col items-start gap-2">
                <p className="font-semibold text-peachred border-b border-darkblue/[.3] py-2 w-full">
                  {username}
                </p>
                <Link to="/profile">
                <button className="text-darkblue/[.6] text-left hover:text-darkblue w-full">
                  <i class="bi bi-person-bounding-box mr-2"></i> Profile
                </button>
                </Link>
                <button
                  onClick={logout}
                  disabled={loading}
                  className="text-darkblue/[.6] text-left hover:text-peachred w-full"
                >
                  <i
                    className={`bi mr-2 ${
                      loading ? "bi-arrow-clockwise" : "bi-box-arrow-right"
                    }`}
                  ></i>{" "}
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
