import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
// import { GUILD } from "../data/config";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Matches", path: "/matches" },
    { name: "About Us", path: "/about" },
    { name: "Join Us", path: "/join" },
    { name: "Challenges", path: "/challenges" },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#05070D]/95 backdrop-blur-md border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/">
            <h1 className="text-2xl font-extrabold tracking-wide">
              <span className="text-white">NOVAA </span>
              <span className="text-sky-400">X</span>
            </h1>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-sky-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-3xl"
          >
            {isOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 left-0 w-full bg-[#0B1220] transition-all duration-300 md:hidden z-40 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col p-5 gap-5">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg ${
                  isActive
                    ? "text-sky-400"
                    : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </div>
      </div>
    </>
  );
}

export default Navbar;