import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Official Team Rivals Website</title>
        <meta
          name="description"
          content="An Offical website for Team Rival where one can get all the latest news,
          upcoming schedule, results, ticket information, player profiles,
          and information about Team Rivals, and buy merchandise of Team Rivals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
