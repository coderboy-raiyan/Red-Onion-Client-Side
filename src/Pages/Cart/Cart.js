import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../Reducers/userSlice/userSlice";
import CartItem from "../../Shared/CartItem/CartItem";
import Header from "./../Home/Header/Header";

const Cart = () => {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector(selectUser);
  const [cart, setCart] = useState([]);

  console.log(cart);
  // form data
  const onSubmit = (data) => {
    console.log(data);
  };

  // load the cart value
  useEffect(() => {
    axios(`http://localhost:5000/cart/${user.email}`).then((data) =>
      setCart(data.data)
    );
  }, [user]);

  return (
    <>
      <Header />

      <section
        style={{
          backgroundImage:
            'url("https://i.postimg.cc/26r0c4h3/bannerbackground.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-[600px] min-h-full"
      >
        <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 py-12">
          {/* Cart items section */}
          <div className="col-span-2 bg-gray-100 p-3 rounded shadow-lg">
            <div>
              {cart.map((items) => (
                <CartItem key={items._id} items={items} />
              ))}
            </div>
          </div>
          {/* Information section */}
          <div className="col-span-2">
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-2/3 backdrop-blur-xl bg-white/30 p-5 rounded shadow-xl ml-auto flex flex-col justify-center items-start space-y-6"
              >
                <div>
                  <p className="text-sm">Subtotal ({cart?.length} items)</p>
                </div>
                <div className="flex flex-col space-y-8 w-full">
                  <input
                    {...register("voucher")}
                    required
                    className="form-input"
                    type="text"
                    placeholder="Enter your voucher"
                  />
                </div>
                <button className="primary-btn w-full rounded py-4 text-lg uppercase ring-2 ring-red-500">
                  Proceed to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
