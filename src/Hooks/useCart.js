import axios from "axios";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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

  // plus a quantity
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
              cogoToast.success("Successfully one more item added");
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

  // minus quantity
  const minus = (foodId) => {
    axios(`http://localhost:5000/cart/item/${foodId}`).then((data) => {
      if (data.data.quantity <= 1) {
        setIsLoading(true);
        // if quantity equal to 1
        axios
          .delete(`http://localhost:5000/cart/delete/${foodId}`)
          .then((res) => {
            setReloadCart(true);
            cogoToast.info("Successfully deleted");
            setIsLoading(false);
          })
          .finally(() => {
            setReloadCart(false);
          });
      } else {
        // if quantity greater than 1
        setIsLoading(true);
        const updatedItem = {
          id: foodId,
          quantity: data.data.quantity - 1,
        };

        axios
          .put("http://localhost:5000/cart/quantity/decrease", updatedItem)
          .then((res) => {
            setReloadCart(true);

            cogoToast.success("One Item removed");
            setIsLoading(false);
          })
          .finally(() => {
            setReloadCart(false);
          });
      }
    });
  };

  // Delete one item directly from cart
  const deleteItem = (foodId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        // if quantity equal to 1
        axios
          .delete(`http://localhost:5000/cart/delete/${foodId}`)
          .then((res) => {
            setReloadCart(true);
            setIsLoading(false);
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          })
          .finally(() => {
            setReloadCart(false);
          });
      } else {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  return {
    plusQuantity,
    minus,
    deleteItem,
    reloadCart,
    isLoading,
  };
};

export default useCart;
