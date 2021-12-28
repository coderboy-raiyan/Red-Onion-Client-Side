import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useFirebase from "../../Hooks/useFirebase";
import { setError } from "../../Reducers/userSlice/userSlice";
import Header from "../Home/Header/Header";

const Login = () => {
  const { googleSignIn, signInUser } = useFirebase();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // empty the error message
  useEffect(() => {
    dispatch(setError(""));
  }, []);

  // handel google login
  const handelGoogle = () => {
    googleSignIn(location, history);
  };

  const onSubmit = (data) => {
    console.log(data);
    // check the password
    if (data.password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
    }

    signInUser(data.email, data.password, location, history);

    reset();
  };

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
          <div className="flex justify-center items-center h-screen flex-col">
            <div className="w-40 mb-5">
              <img src="https://i.postimg.cc/TY7rMwP3/logo2.png" alt="" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white lg:w-2/5 md:w-2/5 w-full px-4 py-8 rounded shadow-lg"
            >
              <div className="flex flex-col space-y-6 mb-4">
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
                <button className="primary-btn rounded py-3 block text-lg hover:border-2 border-2">
                  Login
                </button>
              </div>

              <p className="text-center">Or Login with...</p>
              {/* Google login */}
              <div
                onClick={handelGoogle}
                className="flex border p-4 rounded-full justify-center space-x-4 items-center my-4 cursor-pointer hover:scale-105 transform transition-all"
              >
                <FcGoogle className="text-3xl" />
                <p className="text-lg">Connect with Google</p>
              </div>

              <p className="text-center">
                Don't have account{" "}
                <Link className="text-red-500" to="register">
                  register
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

export default Login;
