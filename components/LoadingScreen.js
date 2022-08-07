import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
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
}
