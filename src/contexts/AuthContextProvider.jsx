import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <AuthContext value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext>
  );
};
export default AuthContextProvider;
