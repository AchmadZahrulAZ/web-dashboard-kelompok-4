import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const navLinks = [
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "What We Do",
      link: "/what-we-do",
    },
    {
      name: "Article",
      link: "/article",
    },
    {
      name: "Portfolio",
      link: "/portfolio",
    },
    {
      name: "Expertise",
      link: "/expertise",
    },
    {
      name: "Testimonial",
      link: "/testimonial",
    },
    {
      name: "Teams",
      link: "/teams",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Subscribe Email",
      link: "/subscribe",
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const resetLinkClick = () => {
    setActiveLink("");
  };

  return (
    <div className="flex flex-col left-0 w-56 h-screen">
      <div className="fixed flex flex-col gap-4 p-6">
        <Link to="/">
        <div onClick={resetLinkClick} className="text-md text-peachred/[0.85] hover:text-peachred font-bold">Dashboard</div>
        </Link>
        <ul className="font-raleway text-white/[.6] flex flex-col border-l">
          {navLinks.map((links, index) => (
            <Link to={links.link} key={index}>
              <li
                onClick={() => handleLinkClick(links.name)}
                className={`${
                  activeLink === links.name
                    ? "text-peachred border-l-2"
                    : "text-peachred/[.5]"
                } hover:text-peachred p-2 hover:border-l-2`}
              >
                {links.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
