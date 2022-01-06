import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import useCart from "./../../Hooks/useCart";

const CartItem = ({ items }) => {
  const { plusQuantity, isLoading, minus } = useCart();

  // plus the quantity
  const handelPlus = (id) => {
    plusQuantity(id);
  };

  // Minus the quantity
  const handelMinus = (id) => {
    minus(id);
  };

  return (
    <div className="bg-zinc-50 rounded shadow my-3">
      <div className="flex w-full space-x-8 items-center px-4 py-3 flex-wrap">
        <ul>
          <li>
            <input type="checkbox" />
          </li>
        </ul>
        <div className="w-24 flex-shrink-0">
          <img src={items?.img} alt="" />
        </div>
        <div className="flex space-x-4">
          <p className="lg:w-32 md:w-32 w-full text-sm">{items?.name}</p>
          <h3 className="text-orange-500 text-lg">${items?.price}</h3>
        </div>
        <div className="flex items-start space-x-4 flex-wrap">
          <button
            onClick={() => handelMinus(items._id)}
            disabled={isLoading === true}
            className="disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 hover:bg-gray-200 p-2 rounded"
          >
            <AiOutlineMinus />
          </button>
          <p className="text-lg">{items?.quantity}</p>
          <button
            onClick={() => handelPlus(items._id)}
            disabled={isLoading === true}
            className="disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 hover:bg-gray-200 p-2 rounded"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
