import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar/Navbar";
import AuthContext, { useAuth } from "../context/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
      <Head>
        <title>Official Team Rivals Website</title>
        <meta
          name='description'
          content='An Offical website for Team Rival where one can get all the latest news,
         upcoming schedule, results, ticket information, player profiles,
         and information about Team Rivals, 
        and buy merchandise of Team Rivals.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <h1 className={styles.title}>Hello From {auth.user}</h1>

      <Image
        className={styles.logo}
        src='/team rivals.png'
        layout='intrinsic'
        height={500}
        width={500}
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
