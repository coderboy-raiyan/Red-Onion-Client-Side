import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItems,
  selectCart,
  setCartLoading,
} from "../../Reducers/CartSlice/CartSlice";
import { selectUser } from "../../Reducers/userSlice/userSlice";
import CartItem from "../../Shared/CartItem/CartItem";
import { selectCartLoading } from "./../../Reducers/CartSlice/CartSlice";
import Header from "./../Home/Header/Header";

const Cart = () => {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const cartLoading = useSelector(selectCartLoading);
  const dispatch = useDispatch();

  // form data
  const onSubmit = (data) => {
    console.log(data);
  };

  // load the cart value
  useEffect(() => {
    dispatch(cartItems(user.email));
    dispatch(setCartLoading(false));
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
        className="w-full h-full min-h-[600px]"
      >
        <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 py-12 ">
          {/* Cart items section */}
          <div className="scrollbar pr-5 scrollbar-thumb-gray-200 scrollbar-track-gray-100 bg-gray-100 p-3 rounded shadow-lg h-[500px] overflow-y-scroll">
            <div>
              {cart.map((items) => (
                <CartItem key={items._id} items={items} />
              ))}
            </div>
          </div>
          {/* Information section */}
          <div className="">
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:w-3/4 w-full lg:my-0 my-3 backdrop-blur-xl bg-white/30 p-5 rounded shadow-xl ml-auto flex flex-col justify-center items-start space-y-6"
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
