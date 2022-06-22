import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const dummy = "dummy";
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      try {
        const result = await axios.post(
          "/api/auth/verify",
          "",
          {
            headers: headers,
          },
          { withCredentials: true }
        );
        const email = result.data.Email;
        console.log(email);
        setAuth({ user: email });
        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    verifyCookie();
  }, []);

  const logIn = async (user) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "/api/login",
        user,
        {
          headers: headers,
        },
        { withCredentials: true }
      );
      console.log("from context");
      console.log(result);
      const email = result.data.Email;
      setAuth({ user: email });
      setLoading(false);
      router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, dummy, logIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
