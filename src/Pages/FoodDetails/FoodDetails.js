import { css } from "@emotion/react";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import Header from "../Home/Header/Header";
import useAddToCart from "./../../Hooks/useAddToCart";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const FoodDetails = () => {
  const { foodId } = useParams();
  const { singleFood, plus, minus, quantity, AddToCart, deatilsLoading } =
    useAddToCart(foodId);

  if (deatilsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color={"#F15858"} css={override} size={20} />;
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="py-10">
        <div className=" lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center justify-center">
          {/* add to cart side */}
          <div className="ld:order-1 md:order-1 order-2">
            <div className="flex flex-col space-y-8">
              <h1 className="text-3xl">{singleFood?.name}</h1>
              <p className="text-lg text-gray-500 font-light">
                {singleFood?.des}
              </p>

              {/* pricing and quantity */}
              <div className="flex justify-between items-center space-x-3 flex-wrap w-2/4">
                <h3 className="text-3xl">${singleFood?.price}</h3>

                <div className="flex items-center space-x-5 border border-gray-400 p-4 rounded-full flex-1 justify-center ">
                  <button onClick={minus} className=" after:text-2xl">
                    <AiOutlineMinus />
                  </button>
                  <p className="text-xl">{quantity}</p>
                  <button
                    onClick={plus}
                    className="disabled:opacity-80 text-2xl text-red-500"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              <div className="flex justify-between flex-wrap w-2/4">
                {/* <Link to="/cart"> */}
                <button onClick={AddToCart} className="primary-btn py-3">
                  <BsCart2 className="inline text-lg mb-1 mr-1" /> Add to Cart
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>

          {/* picture side */}
          <div className="ld:order-2 my-10 md:order-2 order-1">
            <div className="w-4/5 m-auto">
              <img src={singleFood.img} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodDetails;
