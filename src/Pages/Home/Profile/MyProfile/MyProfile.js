import React from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "./../../../../Reducers/userSlice/userSlice";

const MyProfile = () => {
  const user = useSelector(selectUser);
  return (
    <>
      {/* title */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl text-gray-400 font-semibold">My Profile</h1>
        <h4 className="text-sm text-green-500 border rounded-full bg-green-100 px-5 flex justify-center items-center border-green-500 flex-shrink-0">
          Verified
        </h4>
      </div>

      <div>
        <div className="flex space-x-4">
          <div title="Upload your profile" className="relative w-44 group">
            <img
              className="w-44 rounded-full h-44"
              src={user?.photoURL}
              alt=""
            />
            <div className="group-hover:bg-gray-900 absolute bg-gray-300 h-full z-20 top-0 left-0 rounded-full opacity-30 w-full flex items-center justify-center cursor-pointer">
              <p>
                <BsCloudUpload className="text-3xl text-white" />
              </p>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-400 font-bold">Email</span>
            <h2 className="mb-2 text-sm">{user?.email}</h2>
            <span className="text-sm text-gray-400 font-bold block mb-2">
              Your name
            </span>
            <input
              className="rounded text-sm ring-2 border-none ring-gray-400 focus:ring-green-500 focus:ring-2 "
              type="text"
              defaultValue={user?.displayName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
