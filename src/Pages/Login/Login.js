import React from "react";
import Header from "../Home/Header/Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="h-screen flex justify-center items-center ">
        <div className="flex justify-center items-center flex-col space-y-4 w-2/5">
          <h1>Please Login</h1>
          <div className="flex justify-center items-center space-y-4 flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded"
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="rounded"
            />
            <button className="primary-btn block w-full rounded-0">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
