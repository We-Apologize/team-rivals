import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import Navbar from "../../../components/Navbar/Navbar";
import EditorAppBar from "../../../components/EditorComponent/editorAppBar";
import { useState, useEffect, useCallback } from "react";
import RichTextEditor from "../../../components/Editor";
import { Typography, Stack, Button, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { storage } from "../../../lib/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import router from "next/router";
export default function news() {
  const { auth, loading, IsEditor } = useAuth();
  const [value, onChange] = useState("");
  const [title, setTitle] = useState("");
  const [newsId,setNewsId] = useState("")
  const headers = {
    "Content-Type": "application/json",
  };
  const handleImageUpload = useCallback((file) => {
    return new Promise((resolve, reject) => {
      try {
        const imageRef = ref(storage, `/news/${newsId}/${file.name}`);
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            resolve(url);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }, []);
  const handleTitle = (e) => {
    setNewsId(Date.now());
    setTitle(e.target.value);
  };
  const submitHandler = async (e) => {
    console.log("newwsss");
    let authorName = "Unknown";
    if (auth.name) authorName = auth.name;
    const body = {
      id: newsId,
      title: title,
      description: value,
      author: auth.id,
      authorName: authorName,
      time: new Date(Date.now()),
    };
    const res = await axios.post("/api/news", body);
    console.log(res);
    router.push("/news");
  };
  if (loading) return <LoadingScreen />;
  if (!IsEditor) return <h1>The page is not found</h1>;
  return (
    <>
      <Navbar />
      <EditorAppBar />
      <form onSubmit={submitHandler}>
        <Stack
          direction='column'
          sx={{ marginTop: "50px", marginBottom: "50px", marginLeft: "200px" }}
          spacing={4}>
          <Typography variant='h6' component='h6'>
            Add news title
          </Typography>
          <TextField
            sx={{ width: "70%" }}
            id='outlined-basic'
            label='Add a clickbait title'
            variant='outlined'
            onChange={handleTitle}
            required
          />
          <Typography variant='h6' component='h6'>
            Add news description
          </Typography>
          <RichTextEditor
            style={{
              width: "70%",
              minHeight: "300px",
            }}
            value={value}
            onChange={onChange}
            onImageUpload={handleImageUpload}
            required
          />
          <Button type='submit' variant='contained' sx={{ width: "180px" }}>
            <DoneIcon />
            Publish News
          </Button>
        </Stack>
      </form>
    </>
  );
}
