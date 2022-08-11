import Navbar from "../../components/Navbar/Navbar";
import EditorAppBar from "../../components/EditorComponent/editorAppBar";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";
import Head from "next/head";
export default function editorspanel() {
  const { auth, loading, IsEditor } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!IsEditor) return <h1>The page is not found</h1>;
  return (
    <>
      <Head>
        <title>{`Editor | Team Rivals`}</title>
      </Head>
      <Navbar />
      <EditorAppBar />
    </>
  );
}
