import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";


export const likeBlog = async (req, res) => {
  try {
    const [user_id] = req.user;

    const {_id, isLikedByUser} = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate( { _id}, )





  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
