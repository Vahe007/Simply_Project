import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux/es/exports";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = document.cookie.split("=")[1];

  useEffect(() => {
    setUser(token);
  }, [token])

  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

