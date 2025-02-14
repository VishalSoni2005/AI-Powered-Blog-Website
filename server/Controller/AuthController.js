import bcrypt from "bcrypt";
import User from "../Schema/User.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";

//* * * * * * GOOGLE Auth * * * * * * \\
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "../../../blog-website-001-firebase-adminsdk-fbsvc-1cbf77c0ff.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// Regex validations
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// Unique username generator
const generateUsername = async email => {
  let username = email.split("@")[0];

  let isUsernameUnique = await User.exists({ "personal_info.username": username });
  if (isUsernameUnique) {
    username += nanoid(3);
  }

  return username;
};

// Format data to send
const formatDataToSend = user => {
  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" }); //* create access token
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    fullname: user.personal_info.fullname,
    username: user.personal_info.username,
  };
};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate input fields
    if (!fullname || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    // todo
    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({ success: false, message: "Invalid email format" });
    // }

    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
    //   });
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ "personal_info.email": email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique username
    const username = await generateUsername(email);

    // Create user
    const newUser = new User({
      personal_info: { fullname: fullname, password: hashedPassword, email, username },
    });

    await newUser.save();

    res.status(201).json(formatDataToSend(newUser));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error, Unable to process request" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
      });
    }
    const user = await User.findOne({ "personal_info.email": email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.personal_info.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.json(formatDataToSend(user));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error, Unable to process request" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ success: false, message: "Access token is required" });
    }

    const decodedToken = await getAuth().verifyIdToken(access_token);
    let { email, name, picture: image } = decodedToken;

    // Ensure high-resolution profile image
    if (image) {
      image = image.replace("s96-c", "s384-c");
    }

    let existingUser = await User.findOne({ "personal_info.email": email }).select(
      "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
    );

    if (existingUser) {
      if (!existingUser.google_auth) {
        return res.status(403).json({
          success: false,
          message:
            "User is already registered with a different authentication method. Please try again.",
        });
      }
    } else {
      const username = await generateUsername(email); // Ensure uniqueness

      const newUser = new User({
        personal_info: {
          fullname: name,
          email,
          username,
          google_auth: true,
        },
      });

      existingUser = await newUser.save();
    }

    return res.status(200).json(formatDataToSend(existingUser));
  } catch (error) {
    console.error("Error in Google Authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error, Unable to process request" });
  }
};
