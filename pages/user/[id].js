import { useAuth } from "../../context/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";
import Navbar from "../../components/Navbar/Navbar";
import Stack from "@mui/material/Stack";
import styles from "../../styles/User.module.scss";
import router from "next/router";
import { Typography } from "@mui/material";
import { TextField, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #181733 inset" };
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function () {
  const { auth, loading } = useAuth();
  const id = auth.id;
  const mail = auth.user;
  const [email, setEmail] = useState(mail);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //   const handleClick = (e) => {
  //     router.replace("/user");
  //   };
  if (loading) return <LoadingScreen />;
  if (!id)
    return (
      <>
        <h1>Can't found page</h1>
      </>
    );
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.bg}>
      <Navbar />
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ mt: 8 }}>
          <Typography className={styles.text} sx={{ textAlign: "center" }}>
            Personal Information
          </Typography>
          <Stack
            direction='column'
            sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}>
            <TextField
              label='Name'
              id='name'
              size='small'
              sx={{ mt: 1, mb: 4, width: "500px" }}
              inputProps={{ style: inputStyle }}
              type='name'
            />
            <TextField
              label='Email Address'
              id='email'
              size='small'
              sx={{ mt: 1, mb: 4, width: "500px" }}
              inputProps={{ style: inputStyle }}
              value={email}
              type='email'
              onChange={handleEmail}
            />
            <TextField
              label='Password'
              id='password'
              size='small'
              sx={{ mt: 1, mb: 4, width: "500px" }}
              inputProps={{ style: inputStyle }}
              type='password'
            />
            <TextField
              label='Role'
              id='role'
              size='small'
              sx={{ mt: 1, mb: 4, width: "500px", Opacity: 1 }}
              inputProps={{ style: inputStyle }}
              type='role'
              value='Admin'
              disabled
            />
            <TextField
              label='Description'
              id='description'
              size='small'
              sx={{ mt: 1, mb: 4, width: "500px" }}
              inputProps={{ style: inputStyle }}
              type='description'
            />
          </Stack>
        </Box>
      </ThemeProvider>
    </div>
  );
}
