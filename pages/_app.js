import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
