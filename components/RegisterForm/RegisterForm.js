import { TextField, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "./RegisterForm.module.scss";
import { useState } from "react";

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #181733 inset" };
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DarkTextField(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    props.onChangeSubmit(newUser);
    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}>
        <Typography color='white'>Enter Email</Typography>
        <TextField
          label='Email Address'
          id='email'
          size='small'
          value={email}
          sx={{ mt: 1, mb: 4 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='text'
          onChange={handleEmailChange}
        />
        <Typography color='white'>Enter Password</Typography>
        <TextField
          label='Enter Password'
          id='password'
          size='small'
          value={password}
          sx={{ mt: 1, mb: 4 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='password'
          onChange={handlePasswordChange}
        />
        <Button type='submit' variant='contained' className={styles.submit}>
          {props.buttonName}
        </Button>
      </form>
    </ThemeProvider>
  );
}

export default DarkTextField;
