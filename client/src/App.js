import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth.js";
<<<<<<< HEAD
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
=======
import Profile from "./Pages/Profile";
import RequireAuth from "./components/RequireAuth"
import AdminHome from "./Pages/AdminHome";
import UsersContextProvider from "./features/users/UsersContextProvider.js";
import UsersPagination from "./components/UsersPagination.js";
import Materials from "./components/Materials/Materials";
import Snackbar from './components/snackBar/Snackbar'

function App() {
  return (
                            <AuthProvider>
                            <UsersContextProvider>
                              <Snackbar />
                                <Router>
                                    <Routes >  
                                        <Route path="login" element={<Login type="login" />} />
                                        <Route path="signup" element={<Signup type="signup" />} />
                                        <Route path="*" element={<Navigate to="signup"/>} />  
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
                                                <Route path="users" element={<UsersPagination />} />
                                                <Route path="allmaterials" element={<Materials />} />
                                              </Route>           
                                        
                                            </Route>    
                                    </Routes>
                                </Router>
                                </UsersContextProvider>
                          </AuthProvider>

>>>>>>> develop
  );

        

} 

export default App;
