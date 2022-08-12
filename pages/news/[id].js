import { Typography } from "@mui/material";
import { TextField, Button, Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
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

export default function () {
  const { auth, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [loading2, setLoading2] = useState(true);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const CommentChange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };
  const submitHandler = async (e) => {
    if(!auth.id) {
      alert('please login first')
      return;
    }
    let author = "unknown";
    console.log(auth.name);
    console.log("comment", comment);
    if (auth.name) author = auth.name;
    const newComment = {
      commentId: Date.now(),
      comment: comment,
      newsId: id,
      authorName: author,
    };
    await axios.post(`/api/news/${id}/comment`, newComment);
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
        setComments(res.data.comments);
        setLoading2(false);
      }
    }
    if (id) getNews();
  }, [id]);
  if (loading2 || loading) return <LoadingScreen />;
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
              onChange={CommentChange}
            />
            <br />
            <Button
              variant='contained'
              type='submit'
              sx={{ width: "150px", flexGrow: "1", marginY: "20px" }}>
              post comment
            </Button>
          </form>
          {comments.map((comment, i) => (
            //<ObjectRow obj={object} key={i} />
            <Card
              sx={{
                margin: "20px",
                boxShadow: "2px",
                cursor: "pointer",
              }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {comment.author}
                </Typography>
                <Typography gutterBottom>{comment.comment}</Typography>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#3A3B3C",
                  }}>
                  {format(comment.commentId)}
                </Typography>
                {/* <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </>
  );
}
