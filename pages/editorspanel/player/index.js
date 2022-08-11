import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import Navbar from "../../../components/Navbar/Navbar";
import EditorAppBar from "../../../components/EditorComponent/editorAppBar";
import Editor from "../../../components/Editor";
import { useState,useEffect } from "react";
export default function player() {
  const { auth, loading, IsEditor } = useAuth();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  if (loading) return <LoadingScreen />;
  if (!IsEditor) return <h1>The page is not found</h1>;

  return (
    <>
      <Navbar />
      <EditorAppBar />
      <h2>Using CKEditor 5 build in React</h2>
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
