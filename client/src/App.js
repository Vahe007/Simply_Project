import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth.js";
import Profile from "./Pages/Profile.jsx";
import RequireAuth from "./components/RequireAuth";
import Employee from "./Pages/Employee";
import GuestPage from "./Pages/GuestPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login type="login" />} />
          <Route path="signup" element={<Signup type="signup" />} />
          <Route path="*" element={<Navigate to="signup" />} />
          <Route path="employee" element={<Employee />} />
          <Route path='guest' element={<GuestPage />} />
          <Route path="users">
            <Route path=":userId" element={<Login />} />
            <Route path="admin" element={<Login />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
