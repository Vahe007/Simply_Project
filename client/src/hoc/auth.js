import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getMeCall } from "../features/userAccess/userAccessSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // const currentRoute = useSelector(getCurrentRoute);

  useEffect(() => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");

    token && id && dispatch(getMeCall({ id: +id, token }));
  }, []);

  const login = (user, cb) => {
    setUser(user);
    cb();
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
