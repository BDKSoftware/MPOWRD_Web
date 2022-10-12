import React, { createContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext();

// Functional Component Declaration
const AuthProvider = ({ children }) => {
  // State Declaration
  const [userToken, setUserToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const readData = async () => {
    try {
      const value = window.localStorage.getItem("user_token");
      const value2 = window.localStorage.getItem("access_token");

      if (value && value2) {
        setUserToken(value);
        setAccessToken(value2);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  // Function Declaration
  useEffect(() => {
    readData();
  }, []);

  const login = async (userToken, accessToken) => {
    window.localStorage.setItem("user_token", userToken);
    window.localStorage.setItem("access_token", accessToken);
    setUserToken(userToken);
    setAccessToken(accessToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    window.localStorage.removeItem("user_token");
    window.localStorage.removeItem("access_token");
    setUserToken(null);
    setAccessToken(null);
    setIsLoggedIn(false);
  };

  const register = async () => {
    return;
  };

  // Values passed to the context
  const authContextValue = {
    userToken,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    register,
  };

  // Return
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
