import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartItem = ({ items }) => {
  console.log(items);
  return (
    <div className="bg-zinc-50 rounded shadow">
      <div className="flex w-full space-x-8 items-center px-4 py-3">
        <ul>
          <li>
            <input type="checkbox" />
          </li>
        </ul>
        <div className="w-24">
          <img src={items?.img} alt="" />
        </div>
        <div className="flex space-x-4">
          <p>{items?.name}</p>
          <h3 className="text-orange-500 text-lg">${items?.price}</h3>
        </div>
        <div className="flex items-start space-x-4">
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
            <AiOutlineMinus />
          </button>
          <p className="text-lg">{items?.quantity}</p>
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
