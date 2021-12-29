import React from "react";
import Header from "./../Home/Header/Header";

const Cart = () => {
  return (
    <>
      <Header />

      <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 py-12">
        {/* Cart items section */}
        <div>
          <h1>This is cart</h1>
        </div>

        {/* Information section */}
        <div className="col-span-2">
          <div>
            <form className="w-2/3 ml-auto flex flex-col justify-center items-center space-y-6">
              <div className="flex flex-col space-y-8 w-full">
                <input className="form-input" type="text" placeholder="Name" />
                <input
                  className="form-input"
                  type="text"
                  placeholder="Address"
                />
                <input
                  className="form-input"
                  type="text"
                  placeholder="House no"
                />
              </div>
              <button className="primary-btn w-full rounded py-4">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
