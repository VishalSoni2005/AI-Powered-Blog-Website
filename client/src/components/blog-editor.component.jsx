import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../imgs/logo.png";
import BlogBanner from "../imgs/blog banner.png";
import AnimationWrapper from "../common/page-animation";
import EditorJs from "@editorjs/editorjs";
import { tools } from "./tools.component";
import { EditorContext } from "../pages/editor.pages";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../App";

export default function BlogEditor() {
  let { userAuth: { access_token } } = useContext(UserContext);

  let blogBannerRef = useRef();
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    editorState,
    setTextEditor,
    setEditorState
  } = useContext(EditorContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!textEditor.isReady) {
      //? modified
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
    }
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
      console.log("Uploaded Image Data:", data);

      let imgUrl = data.url;
      console.log("Uploaded Image URL +=>> ", imgUrl);

      if (imgUrl) {
        blogBannerRef.current.src = imgUrl;
      }

      // Update the blog banner URL in state
      setBlog((prev) => ({ ...prev, banner: data.url }));
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
    // console.log("blog -> ", blog); //! debugging
    // console.log("blog title -> ", blog.title); //!
  };

  const handlePublishEvent = () => {
    // validate the info

    if (!banner.length) {
      return toast.error("Please upload a banner image");
    }

    if (!title.length) {
      toast.error("Please enter a title");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish"); //* NOTE : Editor state is changing here
          } else {
            toast.error("Please write something in the editor");
          }
        })
        .catch((error) => {
          console.error("Saving failed:", error);
        });
    }

    // console.log("Now editor State ==>> ", editorState);
  };

  const handleSaveDraft = async (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title before saving");
      return;
    }

    let loadingToast = toast.loading("Saving Draft...");
    e.target.classList.add("disable");

    if (!textEditor || !textEditor.isReady) {
      toast.dismiss(loadingToast);
      toast.error("Editor is not ready");
      e.target.classList.remove("disable");
      return;
    }

    try {
      const content = await textEditor.save();

      let blogObject = {
        title,
        content,
        des,
        tags,
        banner,
        draft: true,
      };

      await axios.post("http://localhost:3000/create-blog", blogObject, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      toast.dismiss(loadingToast);
      toast.success("Blog saved successfully");

      setTimeout(() => {
        navigate(`/`);
      }, 500);
    } catch (error) {
      e.target.classList.remove("disable");
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.msg || "Something went wrong");
      toast.error(error.response?.data?.error || "Unknown error occurred");
    }
  };



  // const handleSaveDraft = (e) => {
  //   if (e.target.className.includes("disable")) {
  //     return;
  //   }
  //   if (!title.length) {
  //     toast.error("Please enter a title Before saving");
  //     return;
  //   }

  //   let loadingToast = toast.loading("Saving Draft...");

  //   e.target.classList.add("disable");

  //   if (textEditor.isReady) {
  //     textEditor.save().then((content) => {
  //       let blogObject = {
  //         title,
  //         content, //todo: err
  //         des,
  //         tags,
  //         banner,
  //         draft: true
  //       };

  //       axios
  //         .post("http://localhost:3000/create-blog", blogObject, {
  //           headers: {
  //             // "Content-Type": "application/json",
  //             Authorization: `Bearer ${access_token}`
  //           }
  //         })
  //         .then((res) => {
  //           e.target.classList.remove("disable");
  //           toast.dismiss(loadingToast);
  //           toast.success("Blog saved successfully");

  //           setTimeout(() => {
  //             navigate(`/`);
  //           }, 500);
  //         })
  //         .catch(({ response }) => {
  //           e.target.classList.remove("disable");
  //           toast.dismiss(loadingToast);
  //           toast.error(response.data.msg);
  //           toast.error(response.data.error);
  //         });
  //     });
  //   }
  // };
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
          <button onClick={handleSaveDraft} className="btn-light py-2">
            Save Draft
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto w-full max-w-[900px]">
            {/* //todo: banner div imporve image preview */}


            <div className="border-grey relative aspect-video border-4 bg-white hover:opacity-80">
              <label htmlFor="uploadBanner">
                <img
                  className="w-full h-full object-contain z-20 "
                  ref={blogBannerRef}
                  src={BlogBanner} alt="Blog Banner"
                // className="z-20" //todo: classname modified
                />
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
