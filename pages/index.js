import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar/Navbar";
import Auth from "../utils/authorizationHandler";
export default function Home(props) {
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
      <h1 className={styles.title}>Hello From {props.text}</h1>

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
export async function getServerSideProps(context) {
  const req = context.req;
  const text = Auth(req);
  console.log(text);
  return {
    props: { text }, // will be passed to the page component as props
  };
}
