import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: null,
    realName: null,
    nickName: null,
    email: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  const login = (
    userId,
    realName,
    nickName,
    email,
    accessToken,
    refreshToken,
  ) => {
    setAuth({
      userId,
      realName,
      nickName,
      email,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("realName", realName);
    sessionStorage.setItem("nickName", nickName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      axios
        .post(`http://localhost:8080/api/logout`, {
          refreshToken: refreshToken,
        })

        .catch((err) => {
          console.log(err, "refreshToken 에러");
        });
    }

    setAuth({
      userId: null,
      realName: null,
      nickName: null,
      email: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

    sessionStorage.clear();
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const realName = sessionStorage.getItem("realName");
    const nickName = sessionStorage.getItem("nickName");
    const email = sessionStorage.getItem("email");
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (accessToken) {
      setAuth({
        userId,
        realName,
        nickName,
        email,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
