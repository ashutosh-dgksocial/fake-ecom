"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    const getName = JSON.parse(localStorage.getItem("username")) ?? null;
    return getName ? getName : "";
  });

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(userName));
  }, [userName]);

  const LogOut = () => {
    setUserName("");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ userName, setUserName, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
