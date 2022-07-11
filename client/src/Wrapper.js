import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getLoading,
  getUserInfo,
} from "./features/userAccess/selectors.js";
import { getMeCall } from "./features/userAccess/userAccessSlice.js";
import { LinearProgress } from "@mui/material";
import Profile from "./Pages/Profile.jsx";
import Form from "./Pages/Form";
import ExhibitView from "./Pages/ExhibitView.jsx";

const requireAuth = ["/users/admin", "/users/guest", "/users/employee"];

function Wrapper() {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const isLoading = useSelector(getLoading);

  const location = useLocation();
  useEffect(() => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");

    token && id && dispatch(getMeCall({ id: +id, token }));
  }, []);


  if (isLoading) {
    return <LinearProgress />;
  }

  if (!Object.keys(userInfo).length) {
    return (
      <Routes>
        <Route path="form" element={<Form />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="users">
        <Route path="main" element={<Profile role={userInfo.role} />} />
        <Route path="exhibit-view" element={<ExhibitView />} />
      </Route>
      <Route path="*" element={<Navigate to="users/main" />} />
    </Routes>
  );
}

export default Wrapper;

{
  /* <Route path="admin/*" element={<AdminHome />}>
                  <Route path="users" element={<UsersPagination />} />
                  <Route path="allmaterials" element={<Materials />} />
                </Route> */
}
