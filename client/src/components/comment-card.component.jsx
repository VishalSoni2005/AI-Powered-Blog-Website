import React, { useContext, useState } from "react";
import { getDay } from "../common/date";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import CommentFeild from "./comment-field.component";

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

  let {
    blog,
    setBlog,
    blog: {
      commetns: { results: commentsArr }
    }
  } = useContext(BlogContext);

  const handleReplyClick = () => {
    if (!access_token) {
      return toast.error("Login to reply");
    }

    setReplying((prev) => !prev);
  };

  const removeCommentsCards = (index) => {
    if (commentsArr[index]) {
      while (commentsArr[index].childrenLevel > commentData.childrenLevel) {
        commmentsArr.splice(index, 1);
        if (commentsArr[index]) {
          break;
        }
      }
    }

    setBlog({ ...blog, comments: { results: commentsArr } });
  };

  const hideReplies = () => {
    try {
      commentData.isReplyLoaded = false;

      removeCommentsCards(index + 1);
    } catch (error) {
      console.error("Error hiding replies:", error);
    }
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
          {commentData.isReplyLoaded ? (
            <button
              onClick={hideReplies}
              className="text-dark-grey hover:bg-grey/30 flex items-center gap-2 rounded-md p-2 px-3">
              <i className="fi fi-rs-comment-dots"></i> Hide Reply
            </button>
          ) : (
            ""
          )}
          <button onClick={handleReplyClick} className="underline">
            Reply
          </button>
        </div>

        {isReplying ? (
          <div className="mt-8">
            <CommentFeild
              action={"reply"}
              index={index}
              setReplying={setReplying}
              replyingTo={_id}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentCard;
