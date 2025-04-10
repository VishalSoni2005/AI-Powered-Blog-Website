import React, { useContext, useState } from "react";
import { getDay } from "../common/date";
import { UserContext } from "../App";
import toast from "react-hot-toast";

const CommentCard = ({ index, leftVal, commentData }) => {
  const [isReplying, setReplying] = useState(false);
  let {
    commented_by: {
      personal_info: { profile_img, fullname, username }
    },
    commentedAt,
    comment
  } = commentData;

  let {
    userAuth: { access_token }
  } = useContext(UserContext);

  const handleReplyClick = () => {
    if (!access_token) {
      return toast.error("Login to reply");
    }

    setReplying((prev) => !prev);
  };
  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="border-grey my-5 rounded-md p-6">
        <div className="mb-8 flex items-center gap-3">
          <img src={profile_img} alt="" className="h-6 w-6 rounded-full" />

          <p className="line-clamp-1">
            {fullname} @ {username}
            <p className="min-w-fit">{getDay(commentedAt)}</p>
          </p>
        </div>

        <p className="font-galasio ml-3 text-xl">{comment}</p>

        <div className="mt-5 flex items-center gap-5">
          <button onClick={handleReplyClick} className="underline">
            Reply
          </button>
        </div>

        {isReplying ? (
          <div>
            {/* CommentFeild */}
            //!here 4 43
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentCard;
