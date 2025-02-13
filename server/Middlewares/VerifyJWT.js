import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
        note: "No Authorization header found"
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized", note: "No token provided" });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.id; //todo: note
    next();
    // Check if user is admin
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({
        message: "Unauthorized",
        note: "Invalid token provided at verifyJWT"
      });
  }
};
