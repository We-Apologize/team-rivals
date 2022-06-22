import { useAuth } from "../context/AuthProvider";
export default function New() {
  const { auth, dummy, loading } = useAuth();
  // const user = auth.user;
  console.log("from next");
  console.log(auth.user);

  if (loading) return <h1>loading...</h1>;
  return <h1>{auth.user}</h1>;
}
