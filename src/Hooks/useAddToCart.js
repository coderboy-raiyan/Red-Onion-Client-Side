import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./../Reducers/userSlice/userSlice";

const useAddToCart = (foodId) => {
  const [quantityValue, setQuantityValue] = useState(1);
  const [cartList, setCartList] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [singleFood, setSingleFood] = useState({});
  const user = useSelector(selectUser);

  // get the value of quantity for
  useEffect(() => {
    const isAlreadyInCart = cartList.find((food) => food.id === foodId);
    const isEmailAlreadyInCart = cartList.find(
      (food) => food.email === user.email
    );
    console.log("inside", isAlreadyInCart);
    if (isAlreadyInCart && isEmailAlreadyInCart) {
      setQuantityValue(isAlreadyInCart?.quantity);
    } else {
      setQuantityValue(1);
    }
  }, [singleFood, foodId, cartList, user]);

  // get the selected foods
  useEffect(() => {
    fetch(`http://localhost:5000/foods/${foodId}`)
      .then((res) => res.json())
      .then((data) => setSingleFood(data));
  }, [foodId]);

  // get the ordered food
  useEffect(() => {
    fetch(`http://localhost:5000/food/ordered/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCartList(data));
  }, [isAdded, user]);

  // plus quantity
  const plus = () => {
    if (quantityValue >= 5) {
      alert("You can't add more than 5");
    } else {
      setQuantityValue(quantityValue + 1);
      AddToCart(singleFood._id);
    }
  };

  // minus quantity
  const minus = () => {
    if (quantityValue <= 1) {
      setQuantityValue(1);
      removeFromCart(singleFood._id);
    } else {
      setQuantityValue(quantityValue - 1);
      removeFromCart(singleFood._id);
    }
  };

  // Add to cart button
  const AddToCart = (foodId) => {
    const isAlreadyInCart = cartList.find((food) => food.id === foodId);
    const isEmailAlreadyInCart = cartList.find(
      (food) => food.email === user.email
    );
    singleFood.quantity = quantityValue;

    if (isAlreadyInCart && isEmailAlreadyInCart) {
      const updatedFood = {
        id: foodId,
        quantity: quantityValue,
        email: user.email,
      };
      if (quantityValue >= 5) {
        return alert("You can't add more than 5");
      } else {
        setQuantityValue(quantityValue + 1);
      }

      fetch("http://localhost:5000/order/update", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedFood),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("inside from 0ne", data);
          setIsAdded(true);
        })
        .finally(() => {
          setIsAdded(false);
        });
    } else {
      const userFood = {
        id: foodId,
        email: user?.email,
        name: singleFood.name,
        price: singleFood.price,
        quantity: quantityValue,
      };
      fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userFood),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAdded(true);
          console.log(data);
        })
        .finally(() => {
          setIsAdded(false);
        });
    }
  };

  // Remove from cart

  const removeFromCart = (foodId) => {
    const isAlreadyInCart = cartList.find((food) => food.id === foodId);
    const isEmailAlreadyInCart = cartList.find(
      (food) => food.email === user.email
    );

    if (isAlreadyInCart.quantity === 1 && isEmailAlreadyInCart) {
      // If quantity is equal to 1
      const idAndEmail = {
        id: foodId,
        email: user.email,
      };
      fetch(`http://localhost:5000/order`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(idAndEmail),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      // If quantity is more than 1
      const updatedFood = {
        id: foodId,
        quantity: quantityValue,
        email: user.email,
      };
      fetch("http://localhost:5000/order/decrease", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedFood),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsAdded(true);
        })
        .finally(() => {
          setIsAdded(false);
        });
    }
  };

  return {
    plus,
    minus,
    AddToCart,
    removeFromCart,
    singleFood,
    quantityValue,
  };
};

export default useAddToCart;
