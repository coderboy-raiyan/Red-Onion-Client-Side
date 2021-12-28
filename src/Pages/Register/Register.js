import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCamera } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useFirebase from "../../Hooks/useFirebase";
import { setError } from "../../Reducers/userSlice/userSlice";
import Header from "../Home/Header/Header";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { signUpUser, googleSignIn } = useFirebase();
  const fileRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const [img, setImg] = useState(null);
  const [finalImg, setFinalImg] = useState("");
  const [readImg, setReadImg] = useState(null);
  const dispatch = useDispatch();

  // empty the error message
  useEffect(() => {
    dispatch(setError(""));
  }, []);

  // get the image from the input field
  const handelFile = (e) => {
    setImg(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setReadImg(readerEvent.target.result);
    };
  };

  // send the image to imageBb and get the url
  useEffect(() => {
    if (img) {
      const formData = new FormData();
      formData.append("image", img);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=b8e0c953a6b98e5a101ba8a93b2ceb77",
        data: formData,
      }).then((data) => setFinalImg(data.data.data.url));
    }
  }, [img]);

  // Google Sign in
  const handelGoogle = () => {
    googleSignIn(location, history);
  };

  // At last Submit the form
  const onSubmit = async (data) => {
    // check the password
    if (data.password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
    }

    signUpUser(
      data.email,
      data.password,
      data.name,
      finalImg,
      location,
      history
    );

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
          <div className="flex justify-center items-center flex-col">
            <div className="w-40 my-5">
              <img src="https://i.postimg.cc/TY7rMwP3/logo2.png" alt="" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white lg:w-2/5 md:w-2/5 w-full px-4 py-8 rounded shadow-lg my-5"
            >
              <div className="flex flex-col space-y-6 mb-4">
                {/* upload picture */}
                {img ? (
                  <div className="w-28 h-28 mx-auto relative mb-5">
                    <img
                      src={readImg}
                      alt=""
                      className="rounded-full w-28 h-28 block"
                    />

                    <div
                      onClick={() => setImg(null)}
                      className="absolute inset-x-24 inset-y-6 cursor-pointer "
                    >
                      <RiCloseCircleFill className="text-xl text-red-400 hover:scale-125 transition-all " />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current.click()}
                    className="w-32 h-32 bg-red-100 p-4 rounded-full m-auto flex items-center justify-center cursor-pointer flex-col"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <BsCamera className="text-2xl" />
                      <div className="">
                        <p className="text-xs text-center">Upload Image</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* input box's */}
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  onChange={handelFile}
                />
                <input
                  required
                  {...register("name")}
                  className="form-input"
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  required
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  required
                />
                <button
                  disabled={!img}
                  className="disabled:opacity-75 disabled:bg-red-500 disabled:text-white disabled:cursor-not-allowed primary-btn rounded py-3 block text-lg hover:border-2 border-2"
                >
                  Register
                </button>
              </div>

              <p className="text-center">Or Register with...</p>
              {/* Google button */}

              <div
                onClick={handelGoogle}
                className="flex border p-4 rounded-full justify-center space-x-4 items-center my-4 cursor-pointer hover:scale-105 transform transition-all"
              >
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
