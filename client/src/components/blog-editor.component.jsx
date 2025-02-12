import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../imgs/logo.png";
import BlogBanner from "../imgs/blog banner.png";
import AnimationWrapper from "../common/page-animation";
import EditorJs from "@editorjs/editorjs";
import { tools } from "./tools.component";
import { EditorContext } from "../pages/editor.pages";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// import { uploadToCloudinary } from "../common/cloudinary";

export default function BlogEditor() {
  let {
    blog, //*
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    editorState,
    setTextEditor,
    setEditorState
  } = useContext(EditorContext);

  useEffect(() => {
    const editor = new EditorJs({
      holderId: "textEditor",
      data: content,
      tools: tools, // Pass the tools object here
      placeholder: "Let's Share Your Story"
    });

    setTextEditor(editor);

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  // todo;
  const handleBannerUpload = async (e) => {
    let file = e.target.files[0];
    console.log("Image selected -> ", file);

    if (!file) return;

    // Create FormData and append the file
    let formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData);

      const data = await response.data;
      console.log("Uploaded Image URL:", data.secure_url);

      // Update the blog banner URL in state
      setBlog((prev) => ({ ...prev, banner: data.secure_url }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handletitleChange = (e) => {
    // console.log(e.target.value);
    let input = e.target;

    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;

    setBlog({ ...blog, title: input.value });
    console.log("blog -> ", blog); //! debugging
    console.log("blog title -> ", blog.title); //!
  };

  const handlePublishEvent = () => {
    // validate the info

    // if (!banner.length) {
    //   // tells wheather banner have any image url
    //   return toast.error("Please upload a banner image");
    // }

    console.log("public btn, Now Editor State ==> ", editorState);

    if (!title.length) {
      toast.error("Please enter a title");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish"); // Ensure this is called
          } else {
            toast.error("Please write something in the editor");
          }
        })
        .catch((error) => {
          console.error("Saving failed:", error);
        });
    }

    console.log("Now editor State ==>> ", editorState);
  };
  return (
    <>
      <Toaster />
      <nav className="navbar">
        <Link to="/" className="w-10 flex-none">
          <img src={Logo} alt="Logo" />
        </Link>

        <p className="line-clamp-1 w-full text-black max-md:hidden">
          {title.length ? title : "New Blog"}
        </p>

        <div className="ml-auto flex gap-4">
          <button onClick={handlePublishEvent} className="btn-dark py-2">
            Publish
          </button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto w-full max-w-[900px]">
            {/* //todo: banner div imporve image preview */}
            <div className="border-grey relative aspect-video border-4 bg-white hover:opacity-80">
              <label htmlFor="uploadBanner">
                <img src={BlogBanner} alt="Blog Banner" className="z-20" />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleBannerUpload}
                  hidden
                />
              </label>
            </div>
            {/*  title input field */}
            <textarea
              defaultValue={title}
              // name="description"
              placeholder="Blog Title"
              className="mt-10 h-20 w-full resize-none font-serif text-4xl font-medium leading-tight outline-none placeholder:opacity-40"
              onChange={handletitleChange}
              onKeyDown={handleTitleKeyDown}
              id=""></textarea>
            <hr className="my-10 w-full opacity-40" />

            {/* //* text editor */}
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
}
