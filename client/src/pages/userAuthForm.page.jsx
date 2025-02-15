import React, { useContext, useRef } from "react";
import GoogleImg from "../imgs/google.png";
import InputBox from "../components/input.component";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

export default function AuthForm({ type }) {
  const AuthForm = useRef();

  let {
    userAuth: { access_token },
    setUserAuth
  } = useContext(UserContext);

  console.log("Access Token is ===>> ", access_token);

  //! cousing error
  const userAuthThroughServer = async (route, data) => {
    try {
      const response = await axios.post(`http://localhost:3000${route}`, data);

      console.log("Request made");

      const userData = response.data;
      storeInSession("user", JSON.stringify(userData));
      setUserAuth(userData);

      // Show success notification
      toast.success("Authentication successful");
    } catch (error) {
      console.error("Authentication Error ***:", error);

      // Show error notification
      toast.error("Error occurred during authentication");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serverRoute = type === "sign-in" ? "/signin" : "/signup";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const form = new FormData(AuthForm.current); //* HERE AuthForm is useRef poiniting to <form>
    const formData = Object.fromEntries(form.entries());
    //? from data contain simple js object that contains form data

    const { fullname, email, password } = formData;

    if (type !== "sign-in" && fullname && fullname.length < 3) {
      return toast.error("Fullname must be at least 3 characters long");
    }

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    //todo
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("Invalid password format");
    }

    // authThroughServer
    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    authWithGoogle()
      .then((user) => {
        let serverRoute = "/google-auth";
        let formData = {
          access_token: user.access_token
        };
        userAuthThroughServer(serverRoute, formData);
        console.log("User from google auth => ", user);
      })
      .catch((err) => {
        console.error("Error from authform at handle google auth => ", err);
        toast.error("Error occurred during authentication with Google");
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={AuthForm} className="w-[80%] max-w-[400px]">
          <h1 className="font-gelasio mb-14 text-center text-4xl capitalize">
            {type === "sign-in" ? "Welcome Back" : "Join Us Now"}
          </h1>

          {type !== "sign-in" && (
            <InputBox type="text" placeholder="Your Name" name="fullname" icon="fi-rr-user" />
          )}

          <InputBox type="email" placeholder="Your Email" name="email" icon="fi-rr-envelope" />
          <InputBox type="password" placeholder="Password" name="password" icon="fi-rr-key" />

          <button type="submit" onClick={handleSubmit} className="btn-dark center mt-8">
            {type.replace("-", " ")}
          </button>

          <div className="relative my-6 flex w-full items-center gap-2 font-bold uppercase text-black opacity-10">
            <hr className="w-1/2 border-black" />
            <span>or</span>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark center flex w-[90%] items-center justify-center gap-4"
            onClick={handleGoogleAuth}>
            <img src={GoogleImg} alt="google" className="w-5" />
            Continue with Google
          </button>

          {type === "sign-in" ? (
            <p className="text-dark-grey mt-4 text-center text-xl">
              Don't have an account?
              <Link to="/signup" className="ml-1 text-xl text-black underline">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="text-dark-grey mt-2 text-center text-xl">
              Already have an account?
              <Link to="/signin" className="ml-1 text-xl text-black underline">
                Sign in
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
}
