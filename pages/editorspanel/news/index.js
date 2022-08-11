import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import Navbar from "../../../components/Navbar/Navbar";
import EditorAppBar from "../../../components/EditorComponent/editorAppBar";
import Editor from "../../../components/Editor";
import { useState } from "react";
export default function news() {
  const { auth, loading, IsEditor } = useAuth();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  if (loading) return <LoadingScreen />;
  if (!IsEditor) return <h1>The page is not found</h1>;
  return (
    <>
      <Navbar />
      <EditorAppBar />
      <Editor
        name='description'
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />

      {JSON.stringify(data)}
    </>
  );
}
