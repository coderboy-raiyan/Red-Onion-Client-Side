import React from "react";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border border-gray-200">
      <nav className="flex justify-between items-center max-w-6xl xl:mx-auto mx-5 py-2">
        {/* Left side navbar */}
        <div>
          <div className="w-40 flex-shrink-0">
            <img src="https://i.postimg.cc/TY7rMwP3/logo2.png" alt="" />
          </div>
        </div>
        {/* Middle Navbar */}
        <div></div>
        {/* right side navbar */}
        <div>
          <ul className="space-x-6 items-center hidden lg:inline-flex">
            <li>
              <Link to="/">
                <BsCart3 className="text-2xl hover:scale-110 transform transition-all hover:text-red-500" />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="text-sm hover:text-red-500 transition-all">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="primary-btn">Register</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;