import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Header from "../Home/Header/Header";

const Register = () => {
  return (
    <div>
      <Header />

      {/* Login form*/}

      <div
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/26r0c4h3/bannerbackground.png')",
        }}
        className="bg-no-repeat bg-cover bg-center"
      >
        <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 ">
          <div className="flex justify-center items-center flex-col">
            <div className="w-40 my-5">
              <img src="https://i.postimg.cc/TY7rMwP3/logo2.png" alt="" />
            </div>
            <form className="bg-white lg:w-2/5 md:w-2/5 w-full px-4 py-8 rounded shadow-lg my-5">
              <div className="flex flex-col space-y-6 mb-4">
                <input className="form-input" type="text" placeholder="Name" />
                <input
                  className="form-input"
                  type="text"
                  placeholder="Profile Link"
                />
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                />
                <button className="primary-btn rounded py-3 block text-lg hover:border-2 border-2">
                  Register
                </button>
              </div>

              <p className="text-center">Or Login with...</p>
              <div className="flex border p-4 rounded-full justify-center space-x-4 items-center my-4 cursor-pointer hover:scale-105 transform transition-all">
                <FcGoogle className="text-3xl" />
                <p className="text-lg">Connect with Google</p>
              </div>

              <p className="text-center">
                Already have account{" "}
                <Link className="text-red-500" to="login">
                  Login
                </Link>{" "}
                here
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
