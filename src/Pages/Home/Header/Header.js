import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useFirebase from "../../../Hooks/useFirebase";
import { selectCart } from "./../../../Reducers/CartSlice/CartSlice";
import { selectUser } from "./../../../Reducers/userSlice/userSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const { logout } = useFirebase();
  const [miniProfile, setMiniProfile] = useState(false);

  // handel Mini Profile
  const handelMiniProfile = () => {
    setMiniProfile(!miniProfile);
  };

  const handelLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logout();
        Swal.fire("Successfully Logout", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  return (
    <header className="bg-white border border-gray-200">
      <nav className="flex justify-between items-center max-w-6xl xl:mx-auto mx-5 py-2">
        {/* Left side navbar */}
        <div>
          <div className="w-40 flex-shrink-0">
            <Link to="/">
              <img src="https://i.postimg.cc/TY7rMwP3/logo2.png" alt="" />
            </Link>
          </div>
        </div>
        {/* Middle Navbar */}
        <div></div>
        {/* right side navbar */}
        <div>
          <ul className="space-x-6 items-center hidden lg:inline-flex">
            <li className="relative">
              <Link to="/cart">
                <BsCart3 className="text-2xl hover:scale-110 transform transition-all hover:text-red-500" />

                <span className="absolute -inset-y-2 inset-x-4 text-xs w-5 h-5 flex justify-center items-center animate-pulse cursor-pointer text-white bg-red-500 rounded-full">
                  {cart.length}
                </span>
              </Link>
            </li>
            {user.email ? (
              <>
                <li
                  onClick={handelMiniProfile}
                  className="cursor-pointer relative w-full"
                >
                  <div>
                    <img
                      className={
                        miniProfile
                          ? "w-10 h-10 rounded-full  ring-2 ring-pink-300 transition-all"
                          : "w-10 h-10 rounded-full transition-all"
                      }
                      src={user?.photoURL}
                      alt=""
                    />
                  </div>

                  <ul
                    className={
                      miniProfile
                        ? "inline-flex flex-col space-y-4 absolute rounded px-4 shadow-lg bg-white lg:w-80 -inset-x-72 mt-4 w-full justify-center items-start h-full min-h-[250px] z-20 py-2"
                        : "hidden"
                    }
                  >
                    <li className="w-2/3 mx-auto flex justify-center items-center flex-col">
                      <div>
                        <img
                          className="w-20 h-20 rounded-full"
                          src={user?.photoURL}
                          alt=""
                        />
                      </div>
                      <p className="my-2">{user.displayName}</p>
                    </li>
                    <li className="text-sm">
                      <Link to="/profile">
                        <CgProfile className="inline text-lg mr-2" />{" "}
                        <span>Manage my account</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handelLogout}
                        className="text-sm hover:scale-110 transition-all"
                      >
                        <FiLogOut className="inline text-lg mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
