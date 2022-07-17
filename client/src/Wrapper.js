import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getLoading, getUserInfo } from "./features/userAccess/selectors.js";
import { getMeCall } from "./features/userAccess/userAccessSlice.js";
import { LinearProgress } from "@mui/material";
import Profile from "./Pages/Profile.jsx";
import Form from "./Pages/Form";
import ExhibitView from "./Pages/ExhibitView.jsx";
import UsersPagination from "./components/UsersPagination";
import Materials from "./components/Materials/Materials";
import Navbar from "./components/Navbar";
import AddExhibit from "./components/exhibit/AddExhibit";
import GuestPage from "./Pages/GuestPage";


const requireAuth = ["/users/admin", "/users/guest", "/users/employee"];

function Wrapper() {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const isLoading = useSelector(getLoading);
  const location = useLocation();
  const token = Cookies.get("token");

  const { role } = userInfo;

  useEffect(() => {
    // const token = Cookies.get("token");
    const id = Cookies.get("id");

    token && id && dispatch(getMeCall({ id: +id, token }));
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!Object.keys(userInfo).length || !token) {
    return (
      <Routes>
        <Route path="form" element={<Form />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    );
  }
  if (role === "ADMIN" && token) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="main">
            <Route path="users" element={<UsersPagination />} />
            <Route path="materials" element={<Materials />} />
          </Route>
          <Route path="*" element={<Navigate to="main/users" />} />
        </Routes>
      </>
    );
  }

  if (userInfo.role === "EMPLOYEE") {
    return (
      <Routes>
        <Route path="exhibit-view" element={<ExhibitView />} />
        <Route path="main" element={<Profile role={userInfo.role} />} />
        <Route path="addexhibit" element={<AddExhibit id={userInfo.id} />} />

        <Route path="*" element={<Navigate to="main" />} />
      </Routes>
    );
  }


  if (userInfo.role === "GUEST") {
    return (
      <>
        <Navbar />      
        <Routes>
          <Route path="guest" element={<GuestPage />} />
          <Route path="*" element={<Navigate to="main" />} />
        </Routes>
      </>
    );
  }
}

export default Wrapper;
