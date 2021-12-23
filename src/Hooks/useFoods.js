import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFoodLoading, setFoods } from "../foodsSlice/foodsSlice";

const useFoods = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFoodLoading({ foodLoading: true }));
    setTimeout(() => {
      dispatch(setFoodLoading({ foodLoading: false }));
    }, 3000);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFoods({ foods: data }));
      });
  }, []);
};

export default useFoods;
