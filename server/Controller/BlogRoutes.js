import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";

export const CreateBlog = async (req, res) => {
  // only authenticated users can access this endpoint

  try {
    const authId = req.user;
    const { title, des, tags, banner, content, draft } = req.body;

    if(!title) {
      return res.status(400).json({
        message: "Bad Request",
        note: "Title is required"
      });
    }
    if (!draft) {
      if (!title || !des) {
        return res.status(400).json({
          message: "Bad Request",
          note: "Please fill all the fields"
        });
      }
      if (!banner.length) {
        return res.status(400).json({
          message: "Bad Request",
          note: "Please upload a banner image"
        });
      }

      //* content is object generated from editorjs.
      //* content object contain block array
      if (!content.blocks.length) {
        //!error expected
        return res.status(400).json({
          message: "Bad Request",
          note: "Please write some content"
        });
      }

      if (!tags.length) {
        return res.status(400).json({
          message: "Bad Request",
          note: "Please add tags"
        });
      }
    }
    //* lowercasing all tags
    tags = tags.map((i) => i.toLowerCase());

    //todo: creating dynamic blog id
    const blogId = title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim()
      .nanoid();

    const blog = new Blog({
      blog_id: blogId,
      title,
      banner,
      des,
      content,
      tags,
      author: authId,
      draft: Boolean(draft)
    });
    await blog.save().then((blog) => {
      let incrementVal = draft ? 0 : 1;

      User.findOneAndUpdate(
        {
          _id: authId
        },
        {
          $inc: { "account_info.total_posts": incrementVal },
          $push: {
            blogs: blog._id
          }
        }
      );
      res.status(201).json({
        message: "Blog created successfully",
        data: blog,
        id: blog.blog_id
      });
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      note: "Error in Create Blog request"
    });
  }
};
