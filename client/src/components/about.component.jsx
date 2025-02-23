import React from "react";
import {getDay} from "../common/date";
import { Link } from "react-router-dom";

function AboutUser({ className, bio, social_link, joinedAt }) {
  return (
    <div className={`md:mt-7 md:w-[90%] ` + className}>
      <p className="text-xl leading-7"> {bio.length ? bio : "Nothing to read here"} </p>

      <div className="text-dark-grey my-7 flex flex-wrap items-center gap-x-7 gap-y-2">
        {
          //icon rendering
          //* object.key returns the object of the keys of the provided object
          //* eg: ["youtube", "instagram"]
          Object.keys(social_link).map((key) => {
            let link = social_link[key];
            return link ? (
              <Link
                target="_blank" //* it will redirect to the link in a new tab
                key={key}
                to={link}>
                <i
                  className={
                    `fi ` +
                    (key != "website" ? "ff-brands- " + key : "ff-solid-website") + //* this is because the user may have its portfolio website in db
                    " text-2xl hover:text-black"
                  }></i>
              </Link>
            ) : (
              " "
            );
          })
        }
      </div>
      <p className="text-dark-grey text-xl leading-7">Joined On : {getDay(joinedAt)}</p>
    </div>
  );
}

export default AboutUser;
