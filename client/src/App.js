import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { AuthProvider } from "./components/auth.js";
import Profile from "./pages/Profile.jsx";
import RequireAuth from "./components/RequireAuth"
import AdminHome from "./pages/AdminHome.jsx";
import UsersContextProvider from "./features/users/UsersContextProvider.js";
import UsersPagination from "./components/UsersPagination.js";
import Materials from "./components/Materials/Materials.js";


function App(){
  return (
          <UsersContextProvider>
      <AuthProvider>

            <Router>
                <Routes>
                  <Route path="login" element={<Login type="login" />} />
                  <Route path="signup" element={<Signup type="signup" />} />
                  <Route path="*" element={<Navigate to="signup"/>} />

                  <Route path="users">
                    <Route path=":userId" element={<Login />} />
                    <Route path="admin/*" element={<AdminHome />}>
                        <Route path="userslist" element={<UsersPagination />} />
                        <Route path="allmaterials" element={<Materials />} />
                    </Route>
                    <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
                  </Route>

                </Routes>
              </Router>
          
          </AuthProvider>
          </UsersContextProvider>
  );

} 

export default App;
