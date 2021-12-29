import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import {
  selectLoading,
  selectUser,
} from "./../../Reducers/userSlice/userSlice";

const FoodPrivate = ({ children, ...rest }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default FoodPrivate;
