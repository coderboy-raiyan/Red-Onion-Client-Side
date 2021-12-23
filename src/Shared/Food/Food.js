import React from "react";

const Food = ({ food }) => {
  console.log(food);
  return (
    <div className="bg-white shadow-xl lg:w-80 md:w-80 w-full mx-auto rounded cursor-pointer">
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
