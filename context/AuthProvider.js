import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState({});
  const [IsAdmin, setIsAdmin] = useState(false);
  const [IsEditor, setIsEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const dummy = "dummy";
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      console.log("yooo");
      try {
        const result = await axios.post(
          "/api/auth/verify",
          "",
          {
            headers: headers,
          },
          { withCredentials: true }
        );
        const email = result.data.email;
        const name = result.data.name;
        const id = result.data.id;
        console.log(result.data);
        setAuth({ user: email, name: name, id: id, isLoggedIn: true });
        if (result.data.role === "admin") setIsAdmin(true);
        else if (result.data.role === "editor") setIsEditor(true);
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

      const email = result.data.email;
      const id = result.data.id;
      const name = result.data.name;
      console.log(result.data);
      setAuth({ id: id, user: email, name: name, isLoggedIn: true });
      if (result.data.role == "admin") setIsAdmin(true);
      else if (result.data.role === "editor") setIsEditor(true);
      setLoading(false);
      router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/logout");
      setAuth({});
      setIsAdmin(false);
      setLoading(false);
      router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        dummy,
        logIn,
        loading,
        IsAdmin,
        setIsAdmin,
        IsEditor,
        setIsEditor,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
