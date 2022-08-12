import Image from "next/image";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar/Navbar";
import AuthContext, { useAuth } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import Link from "next/link";
import { format, render, cancel, register } from "timeago.js";
//import { Carousel } from "@mantine/carousel";
import Carousel from "react-material-ui-carousel";
import styles from "../styles/Home.module.scss";
export default function Home(props) {
  const { auth, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return (
    <div className={styles.container}>
      <Navbar />
      <Carousel
        slideGap='xs'
        controlsOffset='xs'
        sx={{ width: "100%" }}
        withIndicators
        styles={{
          indicator: {
            width: 12,
            height: 4,
            transition: "width 250ms ease",

            "&[data-active]": {
              width: 40,
            },
          },
        }}>
        {/* <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide> */}

        {props.data.map((news, i) => (
          //<ObjectRow obj={object} key={i} />
          <Carousel sx={{ height: "500px" }}>
            <>
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  color: "white",
                }}>
                <Link href={`/news/${news.newsId}`} sx={{ cursor: "pointer" }}>
                  <>
                    {/* <img
                      src={news.url}
                      width='1500px'
                      alt='Team Logo'
                      sx={{ cursor: "pointer" }}
                    />
                    <Typography
                      variant='h1'
                      component='h1'
                      sx={{
                        position: "absolute",
                        bottom: "8px",
                        left: "16px",
                      }}>
                      {news.title}
                    </Typography> */}
                    <Card>
                      <div>
                        <CardContent>
                          <div style={{ position: "relative" }}>
                            <CardMedia component='img' image={news.url} />
                            <div
                              className={styles.title}
                              style={{
                                position: "absolute",
                                top: 400,
                                left: "50%",
                                transform: "translateX(-50%)",
                              }}>
                              {news.newsTitle}
                              <p style={{ margin: "0", fontSize: "14px" }}>
                                {" "}
                                <AccessTimeIcon
                                  sx={{ color: "yellow", fontSize: "14px" }}
                                />
                                {format(news.publishedAt)}
                              </p>
                              <br />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </>
                </Link>
              </div>
            </>
          </Carousel>
        ))}
      </Carousel>
      {auth.user && (
        <Typography className={styles.title} sx={{ margin: "40px" }}>
          Hi, {auth.user}
        </Typography>
      )}

      <footer className={styles.footer}>
        Powered by CSE 18
        <span className={styles.logo}>
          <Image src='/favicon.ico' alt='favicon' width={22} height={22} />
        </span>
      </footer>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const res = await axios.get("http://localhost:3000/api/news/home");
  return { props: { data: res.data } };
}
