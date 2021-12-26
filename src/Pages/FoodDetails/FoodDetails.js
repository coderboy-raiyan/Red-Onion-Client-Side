import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Header from "../Home/Header/Header";

const FoodDetails = () => {
  const { foodId } = useParams();
  const [singleFood, setSingleFood] = useState([]);
  const [quantityValue, setQuantityValue] = useState(1);

  // get the selected foods
  useEffect(() => {
    fetch(`http://localhost:5000/foods/${foodId}`)
      .then((res) => res.json())
      .then((data) => setSingleFood(data));
  }, [foodId]);

  // plus quantity
  const plus = () => {
    if (quantityValue >= 5) {
      alert("You can't add more than 5");
    } else {
      setQuantityValue(quantityValue + 1);
    }
  };

  // minus quantity
  const minus = () => {
    if (quantityValue <= 1) {
      setQuantityValue(1);
    } else {
      setQuantityValue(quantityValue - 1);
    }
  };

  // Add to cart button
  const AddToCart = () => {};

  return (
    <>
      <Header />
      <section className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 my-10 items-center justify-center">
        {/* add to cart side */}
        <div className="ld:order-1 md:order-1 order-2">
          <div className="flex flex-col space-y-8">
            <h1 className="text-3xl">{singleFood?.name}</h1>
            <p className="text-lg text-gray-500 font-light">
              {singleFood?.des}
            </p>

            {/* pricing and quantity */}
            <div className="flex justify-between items-center space-x-3 flex-wrap w-2/4">
              <h3 className="text-3xl">${singleFood?.price * quantityValue}</h3>

              <div className="flex items-center space-x-5 border border-gray-400 p-4 rounded-full flex-1 justify-center ">
                <button className="text-2xl" onClick={minus}>
                  <AiOutlineMinus />
                </button>
                <p className="text-xl">{quantityValue}</p>
                <button className="text-2xl text-red-500" onClick={plus}>
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <button onClick={AddToCart} className="primary-btn w-2/6 py-3">
              <BsCart2 className="inline text-lg mb-1 mr-2" /> Add to cart
            </button>
          </div>
        </div>

        {/* picture side */}
        <div className="ld:order-2 md:order-2 order-1">
          <div className="w-4/5 m-auto">
            <img src={singleFood.img} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodDetails;
