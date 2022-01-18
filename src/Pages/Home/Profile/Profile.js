import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { selectUser } from "./../../../Reducers/userSlice/userSlice";
import Header from "./../Header/Header";

const Profile = () => {
  const user = useSelector(selectUser);
  const { path, url } = useRouteMatch();
  return (
    <>
      <Header />

      <div className="py-5 bg-gray-100 h-screen">
        {/* name of user with greetings */}
        <div className="lg:max-w-6xl lg:mx-auto md:max-w-6xl md:mx-auto max-w-3xl mx-4 mb-6">
          <h1 className="text-xs">Hello, {user?.displayName}!</h1>
        </div>
        <div className="lg:max-w-6xl lg:mx-auto md:max-w-6xl md:mx-auto max-w-3xl mx-4 grid lg:grid-cols-4 md:grid-cols-4 gap-x-2">
          {/* left side menu bar */}
          <div className="col-span-1">
            <div className="bg-white w-full px-4 py-4 rounded">
              {/* user profile */}
              <ul className="flex flex-col space-y-2">
                <li>
                  <Link
                    to={`${path}`}
                    className="text-md capitalize font-medium"
                  >
                    Manage my account
                  </Link>
                </li>
                <li>
                  <Link to={`${path}/myprofile`} className="profile-options">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to={`${path}/address`} className="profile-options">
                    Address book
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${path}/paymentoptions`}
                    className="profile-options"
                  >
                    My payment options
                  </Link>
                </li>
                <li>
                  <Link to={`${path}/vouchers`} className="profile-options">
                    Vouchers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* right side sections */}
          <div className="col-span-3">
            <Switch>
              <Route exact path={path}>
                <h3>Manage my accounth</h3>
              </Route>
              <Route path={`${path}/myprofile`}>
                <h1>This is My Profile</h1>
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
    </>
  );
};

export default Profile;
