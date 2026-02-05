import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import useSWRMutation from "swr/mutation";
import authServices from "../services/authServices";
import { setStoredAuthToken } from "../utils/authToken";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { trigger } = useSWRMutation(
    "api/auth/refresh",
    authServices.refreshToken,
  );
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const result = await trigger();
        setUser(result?.user);
        setToken(result?.accessToken);
        setStoredAuthToken(result?.accessToken);
      } catch (error) {
        console.error(
          "Error on sending refresh token post request:",
          error?.response?.data,
        );
      }
    };

    loadAuth();
  }, []);

  return (
    <AuthContext value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext>
  );
};
export default AuthContextProvider;
