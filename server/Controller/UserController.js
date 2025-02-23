import User from "../Schema/User";

export const getProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required"
      });
    }

    const user = await User.findOne({
      "personal_info.username": username
    }).select("-personal_info.password -google_auth -updatedAt -blogs");

    // if (!user) {
    //   return res.status(404).json({
    //     message: "User not found",
    //     user: null  //! potential error
    //   });
    // }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      note: "Error in getting user profile"
    });
  }
};
