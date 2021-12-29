import { css } from "@emotion/react";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import {
  selectLoading,
  selectUser,
} from "./../../Reducers/userSlice/userSlice";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const FoodPrivate = ({ children, ...rest }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color={"#F15858"} css={override} size={50} />;
      </div>
    );
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
