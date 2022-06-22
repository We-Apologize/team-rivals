import { TextField, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import styles from "./RegisterForm.module.scss";
import { useState } from "react";
import {
  emailValidation,
  passwordStrength,
} from "../../client-side-js/validation/validation";

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #181733 inset" };
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DarkTextField(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passHelperText, setPassHelperText] = useState("");
  //const [disable, setDisable] = useState(true);
  // mail change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(emailValidation(e.target.value));
    const { valid, msg } = emailValidation(e.target.value);
    if (valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setHelperText(msg);
  };
  // password change
  const handlePasswordChange = (e) => {
    if (passwordStrength(e.target.value)) {
      setPasswordError(true);
      setPassHelperText("*Password should be between 8 and 60 characters");
    } else {
      setPasswordError(false);
      setPassHelperText("");
    }
    setPassword(e.target.value);
  };
  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    if (emailValidation(email).valid && !passwordStrength(password)) {
      props.onChangeSubmit(newUser);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}>
        <Typography color='white'>Enter Email</Typography>
        <TextField
          helperText={helperText}
          label='Email Address'
          id='email'
          size='small'
          value={email}
          sx={{ mt: 1, mb: 4 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='text'
          onChange={handleEmailChange}
          error={emailError}
        />
        <Typography color='white'>Enter Password</Typography>
        <TextField
          helperText={passHelperText}
          label='Enter Password'
          id='password'
          size='small'
          value={password}
          sx={{ mt: 1, mb: 4 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='password'
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <Button type='submit' variant='contained' className={styles.submit}>
          {props.buttonName}
        </Button>
      </form>
    </ThemeProvider>
  );
}

export default DarkTextField;
