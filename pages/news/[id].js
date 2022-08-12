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
import axios from "axios";
import styles from "../../styles/News.module.scss";
export default function (props) {
  // const { auth, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");
  const [comment, setcomment] = useState("");
  const [loading2, setLoading2] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const submitHandler = async () => {
    await axios.post(`/api/news/${id}/comment`);
  };
  console.log(id);
  useEffect(() => {
    async function getNews() {
      const res = await axios.get(
        `/api/news/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      console.log("from effect", res.data);

      if (id) {
        setTitle(res.data.newsTitle);
        setDescription(res.data.newsDescription);
        const date = new Date(res.data.publishedAt);
        setTime(date.toString());
        setAuthor(res.data.authorName);
        setLoading2(false);
      }
    }
    if (id) getNews();
  }, [id]);
  if (loading2) return <LoadingScreen />;
  return (
    <>
      <Navbar />
      <Box sx={{ margin: "100px", width: "80%" }}>
        <Box>
          <Typography variant='h3' component='h3' className={styles.title}>
            {title}{" "}
          </Typography>
          <Typography
            sx={{
              margin: "10px",
              fontStyle: "italic",
              fontSize: "15px",
              fontColor: "#6A6B6F",
            }}>
            {"Published by " + author + "   |  "}
            {time}
          </Typography>
          <TypographyStylesProvider
            style={{
              marginTop: "80px",
              marginLeft: "50px",
              marginRight: "30px",
              marginBottom: "80px",
            }}>
            <div
              //style={{ margin: "100px", width: "800px", height: "400px" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </TypographyStylesProvider>
        </Box>
        <Stack sx={{ width: "80%" }} spacing={2} direction='column'>
          <Typography
            variant='h6'
            component='h6'
            sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
            Comments
          </Typography>
          <form
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder='Add a comment'
              sx={{ width: "900px" }}
              onChange={(e) => setcomment(e.target.value)}
            />
            <br />
            <Button
              variant='contained'
              type='submit'
              sx={{ width: "150px", flexGrow: "1", marginY: "20px" }}>
              post comment
            </Button>
          </form>
        </Stack>
      </Box>
    </>
  );
}
