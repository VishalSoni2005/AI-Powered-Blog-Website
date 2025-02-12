import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { ToastBar } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";

export default function PublishForm() {
  let charLimit = 200;
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

  return (
    <AnimationWrapper>
      <section className="grid min-h-screen w-screen items-center py-16 lg:grid-cols-2 lg:gap-4">
        <ToastBar />

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
          // !start here
          <p>topics - (help)</p>
        </div>
      </section>
    </AnimationWrapper>
  );
}
