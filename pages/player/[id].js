import { Typography } from "@mui/material";
import { TextField, Button, Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useAuth } from "../../context/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";
import Navbar from "../../components/Navbar/Navbar";
import Stack from "@mui/material/Stack";
import router, { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { TypographyStylesProvider } from "@mantine/core";
import { format, render, cancel, register } from "timeago.js";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cards from "../../components/Card";
import styles from "../../styles/News.module.scss";
export default function (props) {
  // const { auth, loading } = useAuth();
  const [player, setPlayer] = useState({});
  const [loading2, setLoading2] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  useEffect(() => {
    async function getPlayer() {
      const res = await axios.get(
        `/api/player/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      console.log("from effect", res.data);

      if (id) {
        setPlayer({
          name: res.data.name,
          Dob: res.data.dob,
          country: res.data.country,
          height: res.data.height,
          releaseClause: res.data.release_clause,
          joinDate: res.data.join_date,
          position: res.data.position,
          biography: res.data.biography,
          injured: res.data.injured,
          contractEnd: res.data.contract_end,
          image: res.data.image,
        });
        setLoading2(false);
      }
    }
    if (id) getPlayer();
  }, [id]);
  if (loading2) return <LoadingScreen />;
  return (
    <>
      <Navbar />
      <Box sx={{ margin: "100px", width: "80%" }}>
        <Box>
          <Stack direction='column' spacing={4}>
            <Image
              src={player.image}
              layout='intrinsic'
              objectFit='contain'
              width={700}
              height={700}
              alt='Team Logo'
            />
            <Typography variant='h3' component='h3' className={styles.title}>
              {player.name}{" "}
            </Typography>
            <Typography
              variant='h5'
              component='h5'
              sx={{ fontFamily: "roboto", fontWeight: "bolder" }}>
              Biography :
            </Typography>
            <Typography>{player.biography}</Typography>
            <Stack direction='row' spacing={4}>
              <Cards type='Position: ' text={player.position} />
              <Cards type='Height: ' text={player.height} />
              <Cards type='Date of Birth: ' text={player.Dob} />
              <Cards type='Country: ' text={player.country} />
              <Cards type='Release Clause: ' text={player.releaseClause} />
              <Cards type='Join Date: ' text={player.joinDate} />
              <Cards type='Contract End Date: ' text={player.contractEnd} />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
