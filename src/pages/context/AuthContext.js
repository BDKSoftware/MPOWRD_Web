import React, { createContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext();

// Functional Component Declaration
const AuthProvider = ({ children }) => {
  // State Declaration
  const [userToken, setUserToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const readData = async () => {
    try {
      const value = localStorage.getItem("@user_token");

      if (value) {
        setUserToken(value);
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

  const login = async (token) => {
    localStorage.setItem("@user_Token", token);
    setUserToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    localStorage.removeItem("@user_token");
    setUserToken(null);
    setIsLoggedIn(false);
  };

  const register = async () => {
    return;
  };

  // Values passed to the context
  const authContextValue = {
    userToken,
    isLoggedIn,
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
