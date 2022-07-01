import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth.js";
import Profile from "./Pages/Profile.jsx";
import RequireAuth from "./components/RequireAuth";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import ExhibitsContextProvider from "./features/exhibits/ExhibitsContextProvider";
import { QueryParamProvider } from "use-query-params";

function App() {
  return (
    <AuthProvider>
      <QueryParamProvider>
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

              <Route path="login" element={<Login type="login" />} />
              <Route path="signup" element={<Signup type="signup" />} />
              <Route path="*" element={<Navigate to="signup" />} />
            </Routes>
          </Router>
        </ExhibitsContextProvider>
      </QueryParamProvider>
    </AuthProvider>
  );
}

export default App;
