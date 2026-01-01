import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import Loader from "../components/loader.component";
import axios from "axios";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({}); //! creating new context for editor

export default function Editor() {
  const { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false }); //*  used to manage the instance of the EditorJs editor and track whether it is ready for use.

  const [loading, setLoading] = useState(true);
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    (async () => {
      try {
        const {
          data: { blog },
        } = await axios.post("http://localhost:8080/get-blog", {
          blog_id,
          draft: true,
          mode: "edit",
        });
        setBlog(blog);
      } catch (err) {
        console.error("Error fetching blog", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [blog_id]);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : loading ? (
        <Loader />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
}
