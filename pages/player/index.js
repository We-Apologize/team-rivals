import { Typography } from "@mui/material";
import { TextField, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useAuth } from "../../context/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";
import Navbar from "../../components/Navbar/Navbar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Stack from "@mui/material/Stack";
import router, { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { TypographyStylesProvider } from "@mantine/core";
import { format, render, cancel, register } from "timeago.js";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/Fixture.module.scss";
import styles2 from "../../styles/Player.module.scss";
export default function player(props) {
  const { auth, loading } = useAuth();
  // const position = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  const Goalkeeper = props.Goalkeeper;
  const Defender = props.Defender;
  const Midfielder = props.Midfielder;
  const Forward = props.Forward;
  if (loading) return <LoadingScreen />;
  return (
    <>
      <Navbar />
      <Box sx={{ margin: "auto", width: "100%" }} className={styles.heroBg}>
        <Box
          sx={{
            margin: "50px",
            backgroundColor: "white",
            borderRadius: "20px",
          }}>
          <Typography
            component='h1'
            variant='h1'
            className={styles2.title}
            sx={{ textAlign: "center", marginTop: "30px" }}>
            Defender
          </Typography>
          <div className={styles2.itemContainer}>
            <br />
            {Defender.map((player, i) => (
              //<ObjectRow obj={object} key={i} />
              <Link href={`/player/${player.p_id}`} sx={{ cursor: "pointer" }}>
                <Card
                  sx={{
                    width: 300,
                    margin: "20px",
                    boxShadow: "2px",
                    cursor: "pointer",
                  }}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={player.image}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {player.name}
                    </Typography>
                    {/* <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Typography
            component='h1'
            variant='h1'
            className={styles2.title}
            sx={{ textAlign: "center", marginTop: "30px" }}>
            Goalkeeper
          </Typography>
          <div className={styles2.itemContainer}>
            <br />
            {Goalkeeper.map((player, i) => (
              //<ObjectRow obj={object} key={i} />
              <Link href={`/player/${player.p_id}`} sx={{ cursor: "pointer" }}>
                <Card
                  sx={{
                    width: 300,
                    margin: "20px",
                    boxShadow: "2px",
                    cursor: "pointer",
                  }}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={player.image}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {player.name}
                    </Typography>
                    {/* <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Typography
            component='h1'
            variant='h1'
            className={styles2.title}
            sx={{ textAlign: "center", marginTop: "30px" }}>
            Midfielder
          </Typography>
          <div className={styles2.itemContainer}>
            <br />
            {Midfielder.map((player, i) => (
              //<ObjectRow obj={object} key={i} />
              <Link href={`/player/${player.p_id}`} sx={{ cursor: "pointer" }}>
                <Card
                  sx={{
                    width: 300,
                    margin: "20px",
                    boxShadow: "2px",
                    cursor: "pointer",
                  }}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={player.image}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {player.name}
                    </Typography>
                    {/* <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Typography
            component='h1'
            variant='h1'
            className={styles2.title}
            sx={{ textAlign: "center", marginTop: "30px" }}>
            Forward
          </Typography>
          <div className={styles2.itemContainer}>
            <br />
            {Forward.map((player, i) => (
              //<ObjectRow obj={object} key={i} />
              <Link href={`/player/${player.p_id}`} sx={{ cursor: "pointer" }}>
                <Card
                  sx={{
                    width: 300,
                    margin: "20px",
                    boxShadow: "2px",
                    cursor: "pointer",
                  }}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={player.image}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {player.name}
                    </Typography>
                    {/* <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const res = await axios.get("http://localhost:3000/api/player");
  const player = res.data;
  console.log("from ui", player.Defender);
  return { props: player };
}
