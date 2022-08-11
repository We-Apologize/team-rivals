import Image from "next/image";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar/Navbar";
import AuthContext, { useAuth } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import styles from "../styles/Home.module.scss";
export default function Home(props) {
  const { auth, loading } = useAuth();
  if (loading)
    return (
      <LoadingScreen/>
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
