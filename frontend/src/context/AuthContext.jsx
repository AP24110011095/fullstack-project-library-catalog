import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const getStoredUser = () => {
  const raw = localStorage.getItem("libraryUser");
  return raw ? JSON.parse(raw) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("libraryUser", JSON.stringify(userData));
    localStorage.setItem("libraryToken", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("libraryUser");
    localStorage.removeItem("libraryToken");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user)
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
