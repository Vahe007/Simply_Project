<<<<<<< HEAD
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { AuthProvider } from "./hoc/auth";
// import Employee from "./pages/Employee.jsx";
// // import RequireAuth from "./pages/RequireAuth.jsx";
// import AdminHome from "./pages/AdminHome.jsx";
// import UsersContextProvider from "./features/users/UsersContextProvider.js";
// import UsersPagination from "./components/UsersPagination.js";
// import Materials from "./components/materials/Materials";
// import Snackbar from "./components/snackBar/Snackbar";
// import Cookies from "js-cookie";
// import { BASE_URL } from "./constants.js";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import {
//   getAuthorized,
//   getCurrentRoute,
//   getLoading,
//   getToken,
// } from "./features/userAccess/selectors.js";
// import { getMeCall } from "./features/userAccess/userAccessSlice.js";
// import UpdateExhibit from "./pages/UpdateExhibit.jsx";
// import { CircularProgress } from "@material-ui/core";

// const requireAuth = ["/users/admin", "/users/guest", "/users/employee"];

// function App() {
//   const dispatch = useDispatch();
//   const currentRoute = useSelector(getCurrentRoute);
//   const isAuthorized = useSelector(getAuthorized);
//   const isLoading = useSelector(getLoading);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     const id = Cookies.get("id");

//     token && id && dispatch(getMeCall({ id: +id, token }));
//   }, [currentRoute]);

//   if (isLoading) {
//     return <CircularProgress />
//   }
//   if (requireAuth.includes(currentRoute)) {
//     return (
//       <AuthProvider>
//         <UsersContextProvider>
//           <Router>
//             <Routes>
//               <Route path="users">
//                 <Route path="employee" element={<Employee />} />
//                 {/* <Route path="exhibit" element={<UpdateExhibit />} /> */}
//                 {/* <Route path="guest" element={<Guest />} /> */}
//                 <Route path="admin/*" element={<AdminHome />}>
//                   <Route path="users" element={<UsersPagination />} />
//                   <Route path="allmaterials" element={<Materials />} />
//                 </Route>
//               </Route>
//             </Routes>
//           </Router>
//         </UsersContextProvider>
//       </AuthProvider>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="login" element={<Login type="login" />} />
//         <Route path="signup" element={<Signup type="signup" />} />
//         <Route path="*" element={<Navigate to="signup" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import Wrapper from "./Wrapper";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersContextProvider from "./features/users/UsersContextProvider.js";
import { AuthProvider } from "./hoc/auth";
import ExhibitsContextProvider from "./features/exhibits/ExhibitsContextProvider";
=======
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth.js";
import Profile from "./Pages/Profile";
import RequireAuth from "./components/RequireAuth"
import AdminHome from "./Pages/AdminHome";
import UsersContextProvider from "./features/users/UsersContextProvider.js";
import UsersPagination from "./components/UsersPagination.js";
import Materials from "./components/Materials/Materials";
import Snackbar from './components/snackBar/Snackbar'
>>>>>>> develop


const App = () => {
  return (
    <ExhibitsContextProvider>
      <AuthProvider>
        <UsersContextProvider>
          <Router>
            <Wrapper />
          </Router>
        </UsersContextProvider>
      </AuthProvider>
    </ExhibitsContextProvider>
  );
};

export default App;
