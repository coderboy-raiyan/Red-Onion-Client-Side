import React from "react";

const CartItem = ({ items }) => {
  console.log(items);
  return (
    <div>
      <ul>
        <li>
          <input type="checkbox" />
        </li>
      </ul>
      <div>
        <img src={items?.img} alt="" />
      </div>
      <div>
        <p>{items?.name}</p>
      </div>
    </div>
  );
};

export default CartItem;
