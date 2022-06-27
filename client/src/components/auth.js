import e from "cors";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux/es/exports";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  useEffect(() => {
    setUser(token);
  }, [token])

  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
