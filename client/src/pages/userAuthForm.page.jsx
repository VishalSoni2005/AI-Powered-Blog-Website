import React, { useContext, useRef } from 'react';
import GoogleImg from '../imgs/google.png';
import InputBox from '../components/input.component';
import { Link, Navigate } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from '../common/session';
import { UserContext } from '../App';
import { authWithGoogle } from '../common/firebase';

export default function AuthForm({ type }) {
  const AuthForm = useRef();

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  console.log(access_token);

  const userAuthThroughServer = async (route, data) => {
    try {
      const response = await axios.post(`http://localhost:3000${route}`, data);

      const userData = response.data;
      storeInSession('user', JSON.stringify(userData));
      setUserAuth(userData);

      // Show success notification
      toast.success('Authentication successful');
    } catch (error) {
      console.error('Authentication Error:', error);

      // Show error notification
      toast.error('Error occurred during authentication');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const serverRoute = type === 'sign-in' ? '/signin' : '/signup';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const form = new FormData(AuthForm.current);
    const formData = Object.fromEntries(form.entries());

    const { fullname, email, password } = formData;

    if (type !== 'sign-in' && fullname && fullname.length < 3) {
      return toast.error('Fullname must be at least 3 characters long');
    }

    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    if (!emailRegex.test(email)) {
      return toast.error('Invalid email format');
    }

    if (!passwordRegex.test(password)) {
      return toast.error('Invalid password format');
    }

    // authThroughServer
    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth = e => {
    e.preventDefault();
    authWithGoogle()
      .then(user => {
        let serverRoute = '/google-auth';
        let formData = {
          access_token: user.accessToken,
        };

        userAuthThroughServer(serverRoute, formData);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error occurred during authentication with Google');
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={AuthForm} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-14">
            {type === 'sign-in' ? 'Welcome Back' : 'Join Us Now'}
          </h1>

          {type !== 'sign-in' && (
            <InputBox type="text" placeholder="Your Name" name="fullname" icon="fi-rr-user" />
          )}

          <InputBox type="email" placeholder="Your Email" name="email" icon="fi-rr-envelope" />
          <InputBox type="password" placeholder="Password" name="password" icon="fi-rr-key" />

          <button type="submit" onClick={handleSubmit} className="btn-dark center mt-8">
            {type.replace('-', ' ')}
          </button>

          <div className="relative w-full flex items-center gap-2 my-6 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <span>or</span>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            onClick={handleGoogleAuth}
          >
            <img src={GoogleImg} alt="google" className="w-5" />
            Continue with Google
          </button>

          {type === 'sign-in' ? (
            <p className="mt-4 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-dark-grey text-xl text-center">
              Already have an account?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
}
