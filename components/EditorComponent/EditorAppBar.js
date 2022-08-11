import AppBar from "@mui/material/AppBar";
import { Toolbar, Stack, Typography, Button } from "@mui/material";
import styles from "../../styles/News.module.scss";
import router from "next/router";
export default function EditorAppBar() {
  return (
    <AppBar
      position='relative'
      sx={{ height: "50%" }}
      className={styles.appbar}>
      <Toolbar
        sx={{
          justifyContent: "space-evenly",
          color: "white",
          paddingX: "40px",
        }}
        variant='dense'>
        <Button
          variant='text'
          sx={{ color: "white" }}
          onClick={() => {
            router.push("/editorspanel/news?q=new");
          }}>
          Latest
        </Button>
        <Button
          variant='text'
          sx={{ color: "white" }}
          onClick={() => {
            router.push("/editorspanel/news?q=new");
          }}>
          Add News
        </Button>
        <Button
          variant='text'
          sx={{ color: "white" }}
          onClick={() => {
            router.push("/editorspanel/player?q=new");
          }}>
          Add Player
        </Button>
        <Button variant='text' sx={{ color: "white" }} onClick={() => {}}>
          Editors
        </Button>
      </Toolbar>
    </AppBar>
  );
}
