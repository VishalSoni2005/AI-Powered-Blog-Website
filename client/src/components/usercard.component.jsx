import { Link } from "react-router-dom";

//* user : {personal_info: {username, fullname, profile_img}}
export default function UserCard({ user }) {
  let {
    personal_info: { username, fullname, profile_img }
  } = user;
  return (
    <Link to={`/user/${username}`} className="mb-5 flex items-center gap-5">
      <img src={profile_img} className="h-14 w-14 rounded-full" />

      <div>
        <h1 className="line-clamp-2 text-xl font-medium">{fullname}</h1>
        <p className="text-dark-grey ">@{username}</p>
      </div>
    </Link>
  );
}
