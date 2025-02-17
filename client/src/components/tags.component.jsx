import React, { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";

export default function Tags({ tag, tagIndex }) {
  let {
    blog,
    blog: { tags },
    setBlog
  } = useContext(EditorContext);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      // tags[tagIndex] = e.target.innerText;
      // setBlog({ ...blog, tags });

      // Create a new array to avoid mutating the state directly
      const updatedTags = blog.tags.map((item, index) =>
        index === tagIndex ? e.target.innerText : item
      );
      setBlog({ ...blog, tags: updatedTags });

      e.target.setAttribute("contentEditable", "false");
    }
  };

  const tagEditable = (e) => {
    e.target.setAttribute("contentEditable", "true");
    e.target.focus();
  };

  const handleTagDelete = () => {
    const updatedTags = blog.tags.filter((item, index) => index !== tagIndex);
    setBlog({ ...blog, tags: updatedTags });
  };
  return (
    <div className="relative mr-2 mt-2 inline-block rounded-full bg-white p-2 px-5 pr-10 hover:bg-opacity-50">
      <p className="outline-none" onClick={tagEditable} onKeyDown={handleTagKeyDown}>
        {tag}
      </p>

      <button
        className="absolute right-3 top-1/2 mt-[2px] -translate-y-1/2 rounded-full"
        onClick={handleTagDelete}>
        <i class="fi fi-rr-cross pointer-events-none text-sm"></i>
      </button>
    </div>
  );
}
