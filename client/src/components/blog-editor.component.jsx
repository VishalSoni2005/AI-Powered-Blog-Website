import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../imgs/logo.png";
import BlogBanner from "../imgs/blog banner.png";
import AnimationWrapper from "../common/page-animation";
import EditorJs from "@editorjs/editorjs";
import { tools } from "./tools.component";
import { EditorContext } from "../pages/editor.pages";

export default function BlogEditor() {

    useEffect(() => {
        let editor = new EditorJs({
          holderId: "textEditor",
          data: "",
          tools: tools,
          placeholder: "Let's Share Your Story",
        });
    }, []);
  //todo
  const handleBannerUpload = e => {
    let img = e.target.files[0];
    console.log(img);
  }; //todo:

  const handleTitleKeyDown = e => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
    }
  };

  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
  } = useContext(EditorContext);

  const handletitleChange = e => {
    console.log(e.target.value);
    let input = e.target;

    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;

    setBlog({ ...blog, title: input.value });
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='flex-none w-10'>
          <img src={Logo} alt='Logo' />
        </Link>

        <p className='max-md:hidden text-black line-clamp-1 w-full'>
          {title.length ? title : "New Blog"}
        </p>

        <div className='flex gap-4 ml-auto'>
          <button className='btn-dark py-2'>Publish</button>
          <button className='btn-light py-2'>Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className='mx-auto max-w-[900px] w-full'>
            <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey '>
              <label htmlFor='uploadBanner'>
                <img src={BlogBanner} alt='Blog Banner' className='z-20' />
                <input
                  type='file'
                  id='uploadBanner'
                  accept='.png, .jpg, .jpeg'
                  onChange={handleBannerUpload}
                  hidden
                />
              </label>
            </div>

            <textarea
              name='description'
              placeholder='Blog Title'
              className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 font-serif'
              onChange={handletitleChange}
              onKeyDown={handleTitleKeyDown}
              id=''
            ></textarea>

            <hr
              className='w-full 
            opacity-40 my-10'
            />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
}
