import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Chat = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const [message, setMessage] = useState("");
  const [sentmsg, setSentmsg] = useState("");

  useEffect(() => {
    fetch("https://devconnect-server.onrender.com/api/user")
      .then((res) => res.json())
      .then((json) =>
        setData(
          json.filter(
            (e) =>
              e.isAvailable === true &&
              e.connections?.findIndex((conId) => conId === user?.id) !== -1 &&
              currUser.connections?.findIndex((curr) => curr === e._id) !== -1
          )
        )
      )
      .catch((e) => console.log(e));

    user &&
      fetch(`https://devconnect-server.onrender.com/api/user/info/${user.id}`)
        .then((res) => res.json())
        .then((json) => {
          setCurrUser(json);
        })
        .catch((e) => console.log(e));
  }, [user]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      {console.log(data)}
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6 border-0"
                fill="currentColor"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M232,127.6A104,104,0,1,0,37.9,180c2,3.4,4.2,6.7,6.5,9.9l.5.7a103.9,103.9,0,0,0,178.2-20.7,7.2,7.2,0,0,0,.9-2,105.7,105.7,0,0,0,8-39.3v-1ZM44.5,155.9A88.2,88.2,0,0,1,77.3,56.1L94.4,85.8a104.4,104.4,0,0,0-49.9,70.1Zm32.8,44a84.2,84.2,0,0,1-18.4-17.4,88,88,0,0,1,43.5-82.9L118.8,128Zm132.4-39.3a88.2,88.2,0,0,1-93.5,3.8L132.6,136h83A89.3,89.3,0,0,1,209.7,160.6ZM181.4,120a105,105,0,0,0-35.7-78.2A87.9,87.9,0,0,1,215.6,120Z"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="ml-2 font-bold text-xl text-indigo-700 font-tulpen leading-none">
                DEVCONNECT
              </p>
              <p className="ml-2 text-[10px] text-indigo-700 tracking-[9px] leading-none">
                CHAT
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={currUser.profile_img}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">
              {currUser?.fullName}
            </div>
            <div className="text-xs text-gray-500 text-center">
              {currUser?.bio?.charAt(51) === false
                ? currUser?.bio
                : currUser?.bio?.slice(0, 50) + "..."}
            </div>
            <div className="flex flex-row items-center mt-3">
              {currUser?.isAvailable ? (
                <div className="leading-none ml-1 text-[10px] px-2 py-1 rounded-full bg-green-600 text-white">
                  ACTIVE
                </div>
              ) : (
                <div className="leading-none ml-1 text-[10px] px-2 py-1 rounded-full bg-orange-600 text-white">
                  DO NOT DISTURB
                </div>
              )}
            </div>
          </div>
          {/* <div className="flex flex-row items-center justify-between text-xs mt-6">
            <span className="font-bold">Pinned</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              7
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2">
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
          </div> */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Connections</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {data.length}
              </span>
            </div>

            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {data.map((x, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  >
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      <img src={x.profile_img} alt="T" />
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      {x?.fullName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <img src={data[0].profile_img} alt="c" />
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>
                          Hey I am just a Testing Account. Are you want to
                          collab in a project with me?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <img src={data[0].profile_img} alt="c" />
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <img src={currUser.profile_img} alt="c" />
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>I'm ok what about you?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <img src={currUser.profile_img} alt="c" />
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <img src={data[0].profile_img} alt="c" />
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>Lorem ipsum dolor sit amet !</div>
                      </div>
                    </div>
                  </div>
                  {sentmsg && (
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img src={currUser.profile_img} alt="c" />
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>{sentmsg}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={(e) => {
                    setSentmsg(message);
                    console.log(message);
                    console.log(sentmsg);
                    setMessage("");
                  }}
                  type="submit"
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-3 flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
