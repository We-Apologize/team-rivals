import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar/Navbar";
import AuthContext, { useAuth } from "../context/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Home(props) {
  const { auth, loading } = useAuth();
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
  return (
    <div className={styles.container}>
      <Navbar />

      {auth.user && (
        <Typography className={styles.title} sx={{ margin: "40px" }}>
          Hi, {auth.user}
        </Typography>
      )}

      <Image
        src='/team rivals.png'
        layout='intrinsic'
        width={700}
        height={700}
        alt='Team Logo'
      />
      <footer className={styles.footer}>
        Powered by CSE 18
        <span className={styles.logo}>
          <Image src='/favicon.ico' alt='favicon' width={22} height={22} />
        </span>
      </footer>
    </div>
  );
}
