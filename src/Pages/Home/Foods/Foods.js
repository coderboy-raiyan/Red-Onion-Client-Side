import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Food from "../../../Shared/Food/Food";
import FoodSkeliton from "../../../Shared/FoodSkeliton/FoodSkeliton";
import {
  fetchFoods,
  selectFoodLoading,
  selectFoods,
  setFoodLoading,
} from "./../../../foodsSlice/foodsSlice";

const Foods = () => {
  const dispatch = useDispatch();
  const allFoods = useSelector(selectFoods);
  const [foods, setFoods] = useState([]);
  const [thisCate, setThisCate] = useState("");
  const foodLoading = useSelector(selectFoodLoading);

  // food categories
  const categories = [...new Set(allFoods.map((food) => food.category))];

  useEffect(() => {
    dispatch(setFoodLoading({ foodLoading: true }));
    setTimeout(() => {
      dispatch(setFoodLoading({ foodLoading: false }));
    }, 3000);
  }, [foods]);

  // initial food
  useEffect(() => {
    const initial = allFoods.filter((food) => food.category === categories[0]);
    setFoods(initial);
    setThisCate(categories[0]);
  }, [allFoods]);

  console.log(categories[0]);

  // filter by category
  const filterCate = (category) => {
    const items = allFoods.filter((food) => food.category === category);
    setThisCate(category);
    setFoods(items);
  };

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  return (
    <section className="lg:max-w-6xl max-w-3xl mx-4 lg:mx-auto py-10">
      {/* Category side */}
      <div className="mb-12">
        <div className="flex justify-center items-center space-x-9 flex-wrap">
          {categories.map((category, index) => {
            return (
              <button
                className={
                  category === thisCate
                    ? "capitalize font-semibold border-b-2 border-red-500"
                    : "capitalize font-semibold border-b-2 border-white"
                }
                key={index}
                onClick={() => filterCate(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      {/* foods side */}

      <div>
        <div className="grid transition-all lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-6 ">
          {foods.map((food) =>
            foodLoading ? (
              <FoodSkeliton key={food._id} />
            ) : (
              <Food key={food._id} food={food} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Foods;
