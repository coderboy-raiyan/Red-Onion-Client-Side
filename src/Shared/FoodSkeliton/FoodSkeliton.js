import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FoodSkeliton = () => {
  return (
    <div className="bg-white shadow-xl border border-gray-200 lg:w-80 md:w-80 w-full mx-auto rounded cursor-pointer">
      <div className="">
        <div className="w-48 m-auto my-2">
          <Skeleton className="h-48 rounded-full" />
        </div>
        {/* descriptions */}
        <div className="mx-3 my-4">
          <h4 className="text-sm font-semibold">
            <Skeleton className="h-5" />
          </h4>
          <p className="text-gray-400 my-2">
            <Skeleton className="h-5" />
          </p>
          <h3 className="text-2xl">
            <Skeleton className="h-5" />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FoodSkeliton;
