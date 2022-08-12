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

export default function player(props) {
  const { auth, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return (
    <>
      <Box>
        {props.data.map((player, i) => (
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
              </CardContent>
              {/* <CardActions>
                <Button
                  variant='text'
                  size='small'
                  sx={{ color: "#D21255", fontWeight: "bold" }}>
                  <AccessTimeIcon sx={{ fontSize: "14px" }} />
                  Team Rivals
                </Button>
                <Button size='small' sx={{ color: "#707070" }}>
                  {format(news.publishedAt)}
                </Button> 
            </CardActions>*/}
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const res = await axios.get("http://localhost:3000/api/player");

  return { props: { data: res.data } };
}
