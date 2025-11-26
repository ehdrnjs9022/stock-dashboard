import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

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
    refreshToken
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

    localStorage.setItem('userId', userId);
    localStorage.setItem('realName', realName);
    localStorage.setItem('nickName', nickName);
    localStorage.setItem('email', email);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      axios
        .post(`http://localhost:8080/api/logout`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err, 'refreshToken 에러');
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

    localStorage.clear();
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const realName = localStorage.getItem('realName');
    const nickName = localStorage.getItem('nickName');
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

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
