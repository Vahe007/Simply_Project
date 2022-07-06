import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth.js";
import Profile from "./pages/Profile.jsx";
import RequireAuth from "./components/RequireAuth";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import ExhibitsContextProvider from "./features/exhibits/ExhibitsContextProvider";

function App() {
  return (
    <AuthProvider>
        <ExhibitsContextProvider>
          <Router>
            <Routes>
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
              </Route>

              <Route path="signup" element={<Signup type="signup" />} />
              <Route path="login" element={<Login type="login" />} />
              <Route path="*" element={<Navigate to="signup" />} />
            </Routes>
          </Router>
        </ExhibitsContextProvider>
    </AuthProvider>
  );
}

export default App;
