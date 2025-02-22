import React from "react";
import img from "../imgs/404.png";
import fullLogo from "../imgs/blog.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-cover relative flex flex-col items-center gap-20 p-10 text-center">
      <img
        src={img}
        alt="404 not found"
        className="border-grey aspect-square w-72 select-none rounded border-2 object-cover"
      />
      <h1 className="font-galasio text-5xl leading-7">Page Not Found</h1>
      <p className="text-dark-grey -mt-8 text-xl leading-7">
        The page you are looking for does not exist or has been moved. Got to{" "}
        <Link to={"/"} className="text-black underline">
          Home Page
        </Link>
      </p>

      <div className="mt-auto">
        <div className="flex w-auto items-center space-x-2">
          <img src={fullLogo} alt="logo" className="h-12 select-none object-contain" />
          <p className="text-dark-grey whitespace-nowrap font-serif text-3xl font-bold">
            Vishal Writes
          </p>
        </div>

        <p className="text-dark-grey mt-5 text-sm"> Explore the world of writing </p>
      </div>
    </section>
  );
}
