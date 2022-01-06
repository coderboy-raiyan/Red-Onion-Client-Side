import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import initializeAuth from "./Pages/Firebase/Firebase.init";
import FoodDetails from "./Pages/FoodDetails/FoodDetails";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import FoodPrivate from "./Pages/PrivateRoute/FoodPrivate";
import Register from "./Pages/Register/Register";
import { cartItems, setCartLoading } from "./Reducers/CartSlice/CartSlice";
import {
  selectUser,
  setLoading,
  setUser,
} from "./Reducers/userSlice/userSlice";
import "./tailwind.css";
initializeAuth();
const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // load the cart value
  useEffect(() => {
    dispatch(cartItems(user.email));
    dispatch(setCartLoading(false));
  }, [user]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(setUser({}));
        }
        dispatch(setLoading(false));
      }),
    []
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <FoodPrivate path="/foods/:foodId">
          <FoodDetails />
        </FoodPrivate>
        <Route path="/login">
          <Login />
        </Route>
        <FoodPrivate path="/cart">
          <Cart />
        </FoodPrivate>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
