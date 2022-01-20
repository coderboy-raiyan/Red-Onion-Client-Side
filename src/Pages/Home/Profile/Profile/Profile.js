import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import { selectUser } from "../../../../Reducers/userSlice/userSlice";
import Header from "../../Header/Header";
import ManageProfile from "../ManageProfile/ManageProfile";
import MyProfile from "../MyProfile/MyProfile";

const Profile = () => {
  const user = useSelector(selectUser);
  const { path } = useRouteMatch();
  return (
    <>
      <Header />

      <div className="py-5 bg-gray-100 h-screen">
        {/* name of user with greetings */}
        <div className="lg:max-w-6xl lg:mx-auto md:max-w-6xl md:mx-auto max-w-3xl mx-4 mb-6">
          <h1 className="text-xs">Hello, {user?.displayName}!</h1>
        </div>
        <div className="lg:max-w-6xl lg:mx-auto md:max-w-6xl md:mx-auto max-w-3xl mx-4 grid lg:grid-cols-4 md:grid-cols-4 gap-x-2 gap-y-5 grid-cols-1 transition-all">
          {/* left side menu bar */}
          <div className="lg:col-span-1 md:col-span-1 transition-all">
            <div className="bg-white w-full px-4 py-4 rounded border">
              {/* user profile */}
              <ul className="flex flex-col space-y-2">
                <li>
                  <NavLink
                    exact
                    to={`${path}`}
                    activeClassName="text-blue-500"
                    className="text-md capitalize font-medium"
                  >
                    Manage my account
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-blue-500"
                    to={`${path}/myprofile`}
                    className="profile-options"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-blue-500"
                    to={`${path}/address`}
                    className="profile-options"
                  >
                    Address book
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-blue-500"
                    to={`${path}/paymentoptions`}
                    className="profile-options"
                  >
                    My payment options
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-blue-500"
                    to={`${path}/vouchers`}
                    className="profile-options"
                  >
                    Vouchers
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* right side sections */}
          <div className="lg:col-span-3 md:col-span-3 transition-all">
            <div className="rounded lg:mx-5 md:mx-5 mx-0 bg-white p-5 h-full min-h-[300px] shadow">
              <Switch>
                <Route exact path={path}>
                  <ManageProfile />
                </Route>
                <Route path={`${path}/myprofile`}>
                  <MyProfile />
                </Route>
                <Route path={`${path}/address`}>
                  <h1>This is Address</h1>
                </Route>
                <Route path={`${path}/paymentoptions`}>
                  <h1>This is payment options</h1>
                </Route>
                <Route path={`${path}/vouchers`}>
                  <h1>Vouchers</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
