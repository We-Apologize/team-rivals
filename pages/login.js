import styles from "../styles/Register.module.scss";
import { Fragment } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { Stack, Typography, Container, Grid, Button } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Password } from "@mui/icons-material";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
  };
  const handleSubmitForm = async (enteredEmailAndPassword) => {
    const user = {
      ...enteredEmailAndPassword,
    };
    const result = await axios.post(
      "/api/login",
      user,
      {
        headers: headers,
      },
      { withCredentials: true }
    );
    console.log(result.status);
    if (result.status == "200") {
      router.push("http://localhost:3000");
    }
  };
  return (
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
          Welcome!
        </Typography>
        <RegisterForm buttonName='Login' onChangeSubmit={handleSubmitForm} />
      </Grid>
    </Container>
  );
}
