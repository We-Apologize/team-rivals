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
import axios from "axios";
import { SettingsRemoteOutlined } from "@mui/icons-material";
import styles from "../../styles/User.module.scss";
const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #181733 inset" };
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function (props) {
  const router = useRouter();
  const { asPath } = useRouter();
  console.log(asPath);
  const { id } = router.query;
  console.log(id);
  const { auth, loading } = useAuth();
  //   const mail = auth.user;
  const currentUserId = auth.id;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [confirmPassword, setConfirfmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");
  const [queryId, setqueryId] = useState("");
  const [loading2, setLoading2] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let passwordUpdate = false;
    if(password.length!=0 && newPassword.length!=0) passwordUpdate=true;
    const user = {
      name: name,
      email: email,
      password: password,
      newPassword: newPassword,
      description: description,
      isPasswordUpdate: passwordUpdate
    };
    const res = await axios.put(`/api/user/${id}`, user);
    if (res.status == 200) router.push(`/user/${id}`);
  };

  const handleClick = (e) => {
    router.push(`/user/${id}?q=update`);
  };
  useEffect(() => {
    async function getUser() {
      const res = await axios.get(
        `/api/user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      console.log("from effect", res.data);
      setqueryId(res.data.id);
      console.log("query", queryId);
      if (res.data.id) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
        setDescription(res.data.description);
        setLoading2(false);
      }
    }
    if (id) getUser();
  }, [id]);
  if (loading || loading2) return <LoadingScreen />;
  if (currentUserId != queryId) {
    console.log(currentUserId, queryId);
    return (
      <>
        <h1>Can't found page</h1>
      </>
    );
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  if (asPath == `/user/${id}`)
    return (
      <div className={styles.bg} style={{ paddingBottom: "20px" }}>
        <Navbar />
        <ThemeProvider theme={darkTheme}>
          <Stack
            direction='row-reverse'
            sx={{ marginRight: "70px" }}
            spacing={8}>
            <Box className={styles.Card}>
              <Card
                sx={{
                  width: "600px",
                  height: "400px",
                }}
                className={styles.CardContent}>
                <CardContent>
                  <Stack spacing={2} direction='column'>
                    <Typography className={styles.text}>
                      Fan ID: {id}
                    </Typography>
                    <Typography>Name: {name}</Typography>
                    <Typography>Email: {email}</Typography>
                    <Typography>Role: {role}</Typography>
                    <Typography>Description: {description}</Typography>
                    <Button
                      variant='contained'
                      sx={{
                        width: "100px",
                        backgroundColor: "#FDC52F",
                        fontWeight: "bolder",
                      }}
                      onClick={handleClick}>
                      update
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ height: "400px", padding: "200px" }}>
              <Typography className={styles.text}>
                {" "}
                Personal <br /> Information
              </Typography>
            </Box>
          </Stack>
        </ThemeProvider>
      </div>
    );

  if (asPath == `/user/${id}?q=update` && id == currentUserId)
    return (
      <div className={styles.bg}>
        <Navbar />
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ mt: 8 }}>
            <Typography className={styles.text} sx={{ textAlign: "center" }}>
              Update Personal Information
            </Typography>
            <form onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label='Email Address'
                  id='email'
                  size='small'
                  sx={{ mt: 1, mb: 4, width: "500px" }}
                  inputProps={{ style: inputStyle }}
                  value={email}
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <TextField
              label='Password'
              id='password'
              size='small'
              sx={{ mt: 1, mb: 4, width: "500px" }}
              inputProps={{ style: inputStyle }}
              type='password'
            /> */}
                <TextField
                  label='Role'
                  id='role'
                  size='small'
                  sx={{ mt: 1, mb: 4, width: "500px", Opacity: 1 }}
                  inputProps={{ style: inputStyle }}
                  type='role'
                  value={role}
                  disabled
                />
                <TextField
                  label='Description'
                  id='description'
                  size='small'
                  sx={{ mt: 1, mb: 4, width: "500px" }}
                  inputProps={{ style: inputStyle }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type='description'
                />
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    fontFamily: "roboto",
                    mb: "4",
                  }}>
                  Update Password
                </Typography>
                <TextField
                  label='Enter current password'
                  id='password'
                  size='small'
                  sx={{ mt: 1, mb: 4, width: "500px" }}
                  inputProps={{ style: inputStyle }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type='password'
                />
                <TextField
                  label='Enter new password'
                  id='password'
                  size='small'
                  sx={{ mt: 1, mb: 4, width: "500px" }}
                  inputProps={{ style: inputStyle }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type='password'
                />
                <TextField
                  label='Confirm new password'
                  id='password'
                  size='small'
                  sx={{ mt: 1, mb: 4, width: "500px" }}
                  inputProps={{ style: inputStyle }}
                  onChange={(e) => setConfirfmPassword(e.target.value)}
                  value={confirmPassword}
                  type='password'
                />
                <Button
                  variant='contained'
                  type='submit'
                  sx={{
                    width: "100px",
                    backgroundColor: "#FDC52F",
                    fontWeight: "bolder",
                  }}>
                  Save
                </Button>
              </Stack>
            </form>
          </Box>
        </ThemeProvider>
      </div>
    );
}
// export async function getServerSideProps(ctx) {
//   const cookie = ctx.req.headers.cookie;
//   const res = await axios.get(`http://localhost:3000/api/user/${id}`, {
//     headers: {
//       cookie: cookie,
//     },
//   });
//   return {
//     props: {
//       data: res.data,
//     },
//   };
// }
