import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods, selectFoods } from "./../../../foodsSlice/foodsSlice";

const Foods = () => {
  const dispatch = useDispatch();
  const allFoods = useSelector(selectFoods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  return (
    <section className="max-w-6xl mx-auto">
      {/* Category side */}
      <div>
        <h1>{allFoods.length}</h1>
        <div>
          <button></button>
        </div>
      </div>
      {/* foods side */}
    </section>
  );
};

export default Foods;
