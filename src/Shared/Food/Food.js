import React from "react";
import { useHistory } from "react-router-dom";

const Food = ({ food }) => {
  const history = useHistory();

  const handelDetails = () => {
    history.push(`/foods/${food._id}`);
  };

  return (
    <div
      onClick={handelDetails}
      className="bg-white hover:shadow-none transition-all shadow-2xl border border-gray-200 lg:w-80 md:w-80 w-full mx-auto rounded cursor-pointer"
    >
      <div className="">
        <div className="w-48 m-auto my-2">
          <img src={food?.img} alt="" />
        </div>
        {/* descriptions */}
        <div className="flex justify-center items-center space-y-2 flex-col my-4">
          <h4 className="text-sm font-semibold">{food?.name}</h4>
          <p className="text-gray-400">{food?.des?.slice(0, 20)}</p>
          <h3 className="text-2xl">${food?.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Food;
