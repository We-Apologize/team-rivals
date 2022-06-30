import { useAuth } from "../../context/AuthProvider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export default function () {
  const { IsAdmin, auth, loading } = useAuth();
  if (loading)
    return (
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <CircularProgress sx={{ margin: "auto" }} />
      </Box>
    );
  if (!IsAdmin) return <h1>Can't found page</h1>;
  return <h1>hello users</h1>;
}
