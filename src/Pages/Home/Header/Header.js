import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useFirebase from "../../../Hooks/useFirebase";
import {
  selectLoading,
  selectUser,
} from "./../../../Reducers/userSlice/userSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const { logout } = useFirebase();

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
            <li>
              <Link to="/cart">
                <BsCart3 className="text-2xl hover:scale-110 transform transition-all hover:text-red-500" />
              </Link>
            </li>
            {user.email ? (
              <li className="flex items-center space-x-2 cursor-pointer">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
                <p>{user.displayName}</p>
                <button
                  onClick={handelLogout}
                  className="text-2xl hover:scale-110 transition-all"
                >
                  <FiLogOut />
                </button>
              </li>
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
