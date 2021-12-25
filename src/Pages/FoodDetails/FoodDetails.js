import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Home/Header/Header";

const FoodDetails = () => {
  const { foodId } = useParams();
  const [singleFood, setSingleFood] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/foods/${foodId}`)
      .then((res) => res.json())
      .then((data) => setSingleFood(data));
  }, [foodId]);

  return (
    <>
      <Header />
      <div>{singleFood.name}</div>
    </>
  );
};

export default FoodDetails;
