import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Card = ({ data, currUser, setCurrUser }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(currUser, 'card 11');
    const c1 = data?.connections?.findIndex((x) => x === user.id);
    const c2 =
      currUser && currUser.connections?.findIndex((x) => x === data._id);

    if (c1 !== -1 && c2 !== -1) setStatus("Message");
    else if (c1 !== -1) setStatus("Accept");
    else if (c2 !== -1) setStatus("Pending");
    else setStatus("Connect");
  }, [user, currUser]);

  async function connectUser(id) {
    if (status === "Message") {
      navigate("/chat");
      return;
    }
    if (status === "Pending") {
      alert(status);
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/user/connect", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: user.id,
          connectTo: id,
          status: status,
        }),
      });
      const response = await res.json();
      console.log(response);
      setCurrUser(response);
    } catch (error) {
      console.log(error);
    }
  }

  const renderIcons = () => {
    if (status === "Pending") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className="w-4 h-4"
        >
          <rect width="256" height="256" fill="none" />
          <circle cx="128" cy="128" r="88" opacity="0.2" />
          <line
            x1="128"
            y1="80"
            x2="128"
            y2="128"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <line
            x1="169.6"
            y1="152"
            x2="128"
            y2="128"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <polyline
            points="71.8 99.7 31.8 99.7 31.8 59.7"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <path
            d="M65.8,190.2a88,88,0,1,0,0-124.4l-34,33.9"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
      );
    } else if (status === "Message") {
      return (
        <svg
          className="w-4 h-4 transform rotate-45 -mt-px"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      );
    } else {
      return (
        <img
          className="h-4 w-4 rounded-lg"
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/r2FA830xjtI.png"
          alt="c"
        />
      );
    }
  };
  return (
    <>
      {console.log(currUser, "card51")}
      <div className="border-[1px] border-gray-300 rounded-xl p-4 max-w-[400px] bg-white bg-opacity-80 cardnew shadow-lg group relative hover:scale-105 hover:shadow-2xl  transition-all">
        <Link
          to={`/user/${data._id}`}
          className="flex flex-row space-x-5 justify-start pb-2 rounded-xl card-text"
        >
          <img
            src={data.profile_img}
            alt="profile"
            className="rounded-full h-16 w-16 object-cover"
          />
          <div className="my-auto">
            <h4 className="font-semibold text-lg">{data.fullName}</h4>

            <p className="text-sm">@{data.username}</p>
          </div>
        </Link>
        <button
          className={`${
            status === "Pending"
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-300 hover:scale-105 transition-all hover:bg-blue-400"
          } text-white p-1 rounded-xl px-2 py-1 text-xs font-semibold flex max-h-[30px] absolute right-4 top-4`}
          onClick={() => connectUser(data._id)}
          disabled={status === "Pending"}
        >
          {renderIcons(status)}
          <span className="text-black ms-1">{status.toUpperCase()}</span>
        </button>
        <div>
          {
            <p className="text-sm mx-2 ">
              {data?.bio.charAt(51) == false
                ? data?.bio
                : data?.bio.slice(0, 50) + "..."}
            </p>
          }
          {data.skills.length > 0 && (
            <>
              <h4 className="mx-2 mt-4 mb-2">Skills</h4>
              <div className="flex flex-wrap items-center">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#fcd34d]/80 rounded-full px-3 py-1 text-xs mb-1 mr-1"
                  >
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
