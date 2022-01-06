import axios from "axios";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItems, setCartLoading } from "../Reducers/CartSlice/CartSlice";
import { selectUser } from "../Reducers/userSlice/userSlice";

const useCart = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [reloadCart, setReloadCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // load the cart again
  useEffect(() => {
    dispatch(cartItems(user.email));
    dispatch(setCartLoading(false));
  }, [user, reloadCart]);

  const plusQuantity = (foodId) => {
    axios(`http://localhost:5000/cart/item/${foodId}`).then((data) => {
      if (data.data.quantity >= 5) {
        cogoToast.warn("You can't add more than 5 items");
      } else {
        // If value is lower then five
        setIsLoading(true);
        const updatedItem = {
          id: foodId,
          quantity: data.data.quantity + 1,
        };
        axios
          .put(`http://localhost:5000/cart/quantity`, updatedItem)
          .then((res) => {
            if (res.data.modifiedCount) {
              cogoToast.success("Successfully updated");
            } else {
              cogoToast.loading("Wait a few seconds");
            }

            setReloadCart(true);
            setIsLoading(false);
          })
          .finally(() => {
            setReloadCart(false);
          });
      }
    });
  };

  return {
    plusQuantity,
    reloadCart,
    isLoading,
  };
};

export default useCart;
