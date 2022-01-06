import axios from "axios";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItems, setCartLoading } from "../Reducers/CartSlice/CartSlice";
import { selectUser } from "./../Reducers/userSlice/userSlice";

const useAddToCart = (foodId) => {
  const dispatch = useDispatch();
  const [singleFood, setSingleFood] = useState({});
  const [quantity, setQuantity] = useState(1);
  const user = useSelector(selectUser);
  const [isAlreadyCart, setIsAlreadyCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [reloadCart, setReloadCart] = useState(false);
  const [deatilsLoading, setDetailLoading] = useState(true);

  // main cart update
  // load the cart value
  useEffect(() => {
    dispatch(cartItems(user.email));
    dispatch(setCartLoading(false));
  }, [user, reloadCart]);

  // load the all cartItems
  useEffect(() => {
    axios(`http://localhost:5000/food/ordered/${user.email}`).then((data) =>
      setCart(data.data)
    );
  }, [quantity, user, singleFood, reloadCart]);

  // check if it is already in the cart
  useEffect(() => {
    const alreadyCart = cart.find((item) => item.orderId === foodId);
    const emailInCart = cart.find((item) => item.email === user.email);

    if (alreadyCart && emailInCart) {
      setIsAlreadyCart(true);
    } else {
      setIsAlreadyCart(false);
    }
  }, [cart, user, singleFood]);

  // load single food
  useEffect(() => {
    setDetailLoading(true);
    axios(`http://localhost:5000/foods/${foodId}`)
      .then((data) => setSingleFood(data.data))
      .finally(() => {
        setDetailLoading(false);
      });
  }, [foodId]);

  console.log(cart);

  // plus the quantity
  const plus = () => {
    if (quantity >= 5) {
      alert("you can't add more than 5 items");
    } else {
      setQuantity(quantity + 1);
    }
  };

  console.log(isAlreadyCart);

  // minus the quantity
  const minus = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  // Add to cart

  const AddToCart = () => {
    if (isAlreadyCart) {
      // if it's into the cart
      const foodQuantity = cart.find((item) => item.orderId === foodId);
      // check if the quantity is bigger then 5
      const checkQuantity = foodQuantity.quantity + quantity;
      // check if the quantity is smaller or equal then 5
      if (checkQuantity <= 5) {
        const updatedItem = {
          orderId: foodId,
          email: user.email,
          quantity: foodQuantity.quantity + quantity,
        };

        axios
          .put("http://localhost:5000/order/update", updatedItem)
          .then((res) => {
            cogoToast.success(`${checkQuantity} added to cart.`);
            setReloadCart(true);
          })
          .finally(() => {
            setReloadCart(false);
          });
      } else {
        cogoToast.error(
          `${checkQuantity} can not be added to cart. limited to 5.`
        );
      }

      // console.log("already in cart");
    } else {
      // if it's not in the cart
      const foodData = {
        orderId: foodId,
        name: singleFood.name,
        price: singleFood.price,
        img: singleFood.img,
        email: user.email,
        quantity: quantity,
      };

      axios
        .post("http://localhost:5000/order", foodData)
        .then((res) => {
          console.log(res);
          setReloadCart(true);
          cogoToast.success(`Food item added to cart.`);
        })
        .finally(() => {
          setReloadCart(false);
        });
    }
  };

  return {
    singleFood,
    quantity,
    plus,
    minus,
    AddToCart,
    deatilsLoading,
  };
};

export default useAddToCart;
