import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsCheck2Circle, BsCloudUpload } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { selectUser } from "./../../../../Reducers/userSlice/userSlice";

const MyProfile = () => {
  const user = useSelector(selectUser);
  const [edit, setEdit] = useState(false);
  const fileOpenRef = useRef();
  const [selectedImg, setSelectedImg] = useState(null);
  const [readImg, setReadImg] = useState("");
  const [finalImg, setFinalImg] = useState(null);

  useEffect(() => {
    setFinalImg(null);
  }, [selectedImg]);

  useEffect(() => {
    if (selectedImg) {
      const formData = new FormData();
      formData.append("image", selectedImg);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=b8e0c953a6b98e5a101ba8a93b2ceb77",
        data: formData,
      }).then((data) => {
        setFinalImg(data.data.data.url);
        if (data.data.data.url) {
          cogoToast.success("Uploaded Successfully");
        }
      });
    }
  }, [selectedImg]);

  // take the image]
  const handelFile = (e) => {
    setSelectedImg(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setReadImg(readerEvent.target.result);
    };
  };

  // save the changes and send in database
  const handelSave = () => {};

  return (
    <>
      {/* title */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl text-gray-400 font-semibold">My Profile</h1>
        <h4 className="text-sm text-green-500 border rounded-full bg-green-100 px-5 flex justify-center items-center border-green-500 flex-shrink-0">
          Verified
        </h4>
      </div>

      <div>
        <div className="flex space-x-4">
          {edit ? (
            // If edit is true
            <>
              <div
                title="Upload your profile"
                className="relative w-44 h-44 group"
              >
                {selectedImg ? (
                  finalImg ? (
                    <img
                      className="w-44 rounded-full h-44"
                      src={readImg}
                      alt=""
                    />
                  ) : (
                    <div>
                      <Skeleton className="w-44 rounded-full h-44" />
                    </div>
                  )
                ) : (
                  <img
                    className="w-44 rounded-full h-44"
                    src={user?.photoURL}
                    alt=""
                  />
                )}
                <div
                  onClick={() => fileOpenRef.current.click()}
                  className="group-hover:bg-gray-900 absolute bg-gray-300 h-full z-20 top-0 left-0 rounded-full opacity-30 w-full flex items-center justify-center cursor-pointer"
                >
                  <p>
                    <BsCloudUpload className="text-3xl text-white" />
                  </p>
                </div>
                <input
                  className="hidden"
                  type="file"
                  ref={fileOpenRef}
                  onChange={handelFile}
                />
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
            </>
          ) : (
            // If edit is not true
            <>
              <div
                title="Upload your profile"
                className="relative w-44 h-44 group"
              >
                <img
                  className="w-44 rounded-full h-44"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <div>
                <span className="text-sm text-gray-400 font-bold">Email</span>
                <h2 className="mb-2 text-sm">{user?.email}</h2>
                <span className="text-sm text-gray-400 font-bold block mb-2">
                  Your name
                </span>
                <p className=" text-sm ">{user?.displayName}</p>
              </div>
            </>
          )}
          <div>
            {edit ? (
              <>
                <button
                  onClick={() => handelSave}
                  className="primary-btn bg-green-500 hover:border-green-500 hover:text-green-500 text-xs mr-4"
                >
                  Save <BsCheck2Circle className="inline" />
                </button>
                <button
                  onClick={() => setEdit(!edit)}
                  className="primary-btn text-xs"
                >
                  Cancel <MdOutlineCancel className="inline" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEdit(!edit)}
                className="text-sm text-red-500"
              >
                Edit <BiEdit className="inline" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
