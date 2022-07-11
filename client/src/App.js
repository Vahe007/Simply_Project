import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth.js";
import Profile from "./Pages/Profile.jsx";
import RequireAuth from "./components/RequireAuth";
import AdminHome from "./Pages/AdminHome.jsx";
import UsersPagination from "./components/UsersPagination.js";
import Materials from "./components/Materials/Materials";
import Snackbar from "./components/snackBar/Snackbar";
import AddExhibit from "./components/exhibit/AddExhibit.js";
import SearchParamsContextProvider from "./components/listOfUsers/SearchParamsContext.js";

function App() {
  return (
    <AuthProvider>
      <Snackbar />
      <Router>
        <Routes>
          <Route path="login" element={<Login type="login" />} />
          <Route path="signup" element={<Signup type="signup" />} />
          <Route path="*" element={<Navigate to="signup" />} />
          <Route path="users">
            {/* <Route path=":userId" element={<Profile />} />
                                                <Route path="admin" element={<Profile />} /> */}
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path=":userId" element={<Login />} />
            <Route path="admin/*" element={<AdminHome />}>
              <Route
                path="users"
                element={
                  <SearchParamsContextProvider>
                    <UsersPagination />
                  </SearchParamsContextProvider>
                }
              />
              <Route path="allmaterials" element={<Materials />} />
              <Route path="addExhibit" element={<AddExhibit />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
