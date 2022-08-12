import styles from "../styles/Register.module.scss";
import Head from "next/head";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { Stack, Typography, Container, Grid, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Password } from "@mui/icons-material";

export default function Register() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const handleSubmitForm = async (enteredEmailAndPassword) => {
    const user = {
      ...enteredEmailAndPassword,
    };
    console.log(user)
    await axios
      .post("/api/register", user)
      .then(function (res) {
        setMsg(res.data.msg);
        setErr(res.data.err);
        console.log(res);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  return (
    <>
      <Head>
        <title>{`Register | Team Rivals`}</title>
      </Head>
      <Container
        className={styles.wrapper}
        style={{
          position: "relative",
          display: "flex",
          marginLeft: "0px",
          paddingLeft: "0px",
        }}>
        <Container className={styles.imageWrapper}>
          <Stack direction='row' justifyContent='end'>
            <Image
              src='/background.jpg'
              layout='fill'
              objectFit='cover'
              quality={100}
              className={styles.image}
              alt='Background image'
            />
          </Stack>
        </Container>
        <Grid
          className={styles.grid}
          container
          spacing={0}
          direction='column'
          alignItems='center'>
          <Image
            src='/team rivals.png'
            layout='intrinsic'
            height={100}
            width={100}
            alt='Team Logo'
          />
          <Typography className={styles.text} sx={{ mb: 4 }}>
            Register for Free!
          </Typography>
          {err == true ? (
            <Typography sx={{ color: "red" }}>{msg}</Typography>
          ) : (
            <Typography sx={{ color: "white" }}>{msg}</Typography>
          )}

          <RegisterForm
            buttonName="Let's go"
            onChangeSubmit={handleSubmitForm}
          />
        </Grid>
      </Container>
    </>
  );
}
