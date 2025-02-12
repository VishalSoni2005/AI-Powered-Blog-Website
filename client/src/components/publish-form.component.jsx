import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import Tags from "./tags.component";

export default function PublishForm() {
  let charLimit = 200;
  let tagLimit = 10;
  let {
    blog,
    blog: { banner, title, tags, des },
    setEditorState,
    setBlog
  } = useContext(EditorContext);

  const handleClick = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

  const handleTitleKeyDown = (e) =>
    e.key === "Enter" || e.keyCode === 13 ? e.preventDefault() : null;

  const handleTagKeyDown = (e) => {
    if (e.keyCode === 188 || e.keyCode === 13) {
      e.preventDefault();

      let tag = e.target.value;

      if (!tag.length) {
        return toast.error("Tag cannot be empty");
      }

      if (tags.length < tagLimit) {
        if (tags.includes(tag)) {
          e.target.value = "";
          return toast.error("Tag already exists");
        } else {
          setBlog({ ...blog, tags: [...tags, tag] });
          e.target.value = "";
          toast.success("Tag added successfully");
        }
      } else {
        e.target.value = "";
        return toast.error("You can add only 10 tags");
      }
    }
  };

  return (
    <AnimationWrapper>
      <section className="grid min-h-screen w-screen items-center py-16 lg:grid-cols-2 lg:gap-4">
        <Toaster />

        <button className="absolute right-[5vw] top-[5%] z-10 h-12 w-12 lg:top-[10%]">
          onClick = {handleClick}
          <i className="ff fi-br-cross"></i>
        </button>

        <div className="center max-w-[550px]">
          <p className="text-dark-grey mb-1">preview</p>
          <div className="bg-grey mt-4 aspect-video w-full overflow-hidden rounded-lg">
            <img src={banner} alt="" />
          </div>
          <h1 className="mt-2 line-clamp-2 text-4xl font-medium leading-tight">{title}</h1>

          <p className="font-gelasio mt-4 line-clamp-2 text-xl leading-7">{des}</p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />
          <p className="text-dark-grey mb-2 mt-9">Short Description About Your Blog</p>
          <textarea
            maxLength={charLimit}
            placeholder="Short Description About Your Blog"
            className="input-box h-40 resize-none pl-4 leading-7"
            onChange={(e) => setBlog({ ...blog, des: e.target.value })}
            defaultValue={des}
            onKeyDown={handleTitleKeyDown}></textarea>
          <p className="text-dark-grey mt-1 text-right text-sm">
            {charLimit - des.length} Characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            topics - (Help us searching and ranking your blog post){" "}
          </p>

          <div className="input-box relative py-2 pb-4 pl-2">
            <input
              type="text"
              placeholder="Topics"
              className="input-box sticky left-0 top-0 mb-3 bg-white pl-4 focus:bg-white"
              onKeyDown={handleTagKeyDown}
            />
            {tags.map((tag, i) => {
              <Tags tag={tag} key={i} tagIndex={i} />;
            })}

          </div>
            <p className="text-dark-grey mt-1 mb-4 text-right text-sm">
              {tagLimit - tags.length} Tags left
            </p>

            <button className="btn-dark px-8">Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
}
