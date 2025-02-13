import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

const blogStructure = {
  title: "",
  banner: "", //todo: it will contain secure url of image
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} }
};

export const EditorContext = createContext({}); //! creating new context for editor

export default function Editor() {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false }); //*  used to manage the instance of the EditorJs editor and track whether it is ready for use.

  let {
    userAuth: { access_token }
  } = useContext(UserContext);

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
}