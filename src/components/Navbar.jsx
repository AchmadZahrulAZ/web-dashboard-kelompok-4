import React from "react";

export default function Navbar({ logout, loading }) {
  return (
    <nav className="mb-4">
      <div className="px-6 py-6">
        <div className="fixed z-10 top-0 left-0 py-3 px-6 bg-white/[.6] backdrop-blur-sm w-full flex justify-between items-center">
            <h1 className="text-xl font-bold">LOGO</h1>
          <ul className="flex gap-2">
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
                <div className="absolute top-10 right-0 bg-white min-w-56 shadow-lg rounded-md p-4 hidden group-hover:flex flex-col items-start gap-2">
                    <p className="font-semibold border-b border-darkblue/[.3] py-2 w-full">Username</p>
                    <button className="text-darkblue/[.6] text-left hover:text-darkblue w-full"><i class="bi bi-person-bounding-box mr-2"></i> Profile</button>
                    <button onClick={logout} disabled={loading} className="text-darkblue/[.6] text-left hover:text-peachred w-full"><i className={`bi mr-2 ${loading ? "bi-arrow-clockwise" : "bi-box-arrow-right"}`}></i> Logout</button>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
