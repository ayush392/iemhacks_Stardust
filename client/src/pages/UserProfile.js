import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const url = `https://devconnect-rwj2.onrender.com/api/user/info/${id}`;
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setUserInfo(json))
      .catch((e) => console.log(e));
  }, [url]);

  const addConnection = () => {
    console.log(user.id, id, "userprofile20");
    fetch(`https://devconnect-rwj2.onrender.com/api/user/connect`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        _id: user?.id,
        connectTo: id,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((e) => console.log(e));
  };

  //Languages
  // `https://github-readme-stats.vercel.app/api/top-langs?username=${userInfo.username}&show_icons=true&locale=en&layout=compact`

  //stats
  // `https://github-readme-stats.vercel.app/api?username=${userInfo.username}&show_icons=true&locale=en`

  //contribution and streak
  // `https://github-readme-streak-stats.herokuapp.com/?user=${userInfo.username}`

  return (
    <>
      <div className="bg-white bg-opacity-90 px-2 md:py-7">
        <div className="flex ">
          <div className="container mx-auto px-2 md:px-8">
            <div className="flex px-2 md:px-10">
              <div className="w-1/4">
                <div className="mb-4 ">
                  <img
                    className="rounded-lg shadow-lg"
                    src={userInfo?.profile_img}
                    alt="profile-img"
                  />
                </div>
                <div className="mb-4 ">
                  <div className="text-lg md:text-3xl font-medium text-grey-darkest">
                    {userInfo?.fullName?.toUpperCase()}
                  </div>
                  <div className="text-md md:text-lg text-grey-dark font-light">
                    {userInfo?.username.toLowerCase()}
                  </div>
                </div>
                <div className="pb-6 border-b">
                  <a href="#" className="no-underline text-xs md:text-sm">
                    {userInfo?.bio.charAt(101) == false
                      ? userInfo?.bio
                      : userInfo?.bio.slice(0, 100) + "..."}
                  </a>
                </div>
                <a
                  href="#"
                  className="flex items-center justify-start text-left space-x-1 py-4 mb-4 border-b"
                >
                  <svg
                    className="fill-current text-grey-dark w-4 h-4 flex-shrink-0"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                  </svg>
                  <span className="no-underline text-xs md:text-sm">
                    {userInfo?.email}
                  </span>
                </a>
                <div className="">
                  <div className="font-medium text-grey-darkest">Links</div>
                  <div className="flex items-center mt-2">
                    <div className="mr-1">
                      <a href={userInfo?.url?.linkedin}>
                        <img
                          className="w-6 h-6 md:w-11 md:h-11 rounded-lg object-cover p-[1.5px] shadow-xl"
                          src="https://th.bing.com/th/id/R.a358a1767c98aa8803284994e5e04b23?rik=vSxG%2b4perV96ug&riu=http%3a%2f%2fwww.vectorico.com%2fwp-content%2fuploads%2f2018%2f02%2fLinkedIn-Icon-Square-Dark-300x300.png&ehk=anVAKAueKV%2fPX3a2O1ogK4cwo1VUcmMDbgjNFjUoxgc%3d&risl=&pid=ImgRaw&r=0"
                        />
                      </a>
                    </div>
                    <div className="mr-1">
                      <a href={userInfo?.url?.leetcode}>
                        <img
                          className="w-6 h-6 md:w-11 md:h-11 object-cover rounded-lg p-[1.5px] shadow-xl"
                          src="https://media.glassdoor.com/sqll/1763822/leetcode-squarelogo-1524799041565.png"
                        />
                      </a>
                    </div>
                    <div className="mr-1">
                      <a href={`https://github.com/${userInfo?.username}`}>
                        <img
                          className="w-6 h-6 md:w-11 md:h-11 rounded-2xl"
                          src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/github_square_black-1024.png"
                        />
                      </a>
                    </div>
                    <div className="mr-1">
                      <a href={userInfo?.url?.portfolio}>
                        <img
                          className="w-6 h-6 md:w-11 md:h-11 rounded p-[1.5px] shadow-xl"
                          src="https://adobe.psu.edu/files/2020/07/Portfolio-1280x1249.png"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/4 ml-6 mt-1">
                {/*<div className="flex items-center">
                   <div className="w-1/2 pt-6 pb-2 justify-end text-right text-grey-dark text-sm font-light flex">
                    <div>Contribution settings</div>
                    <div className="">
                      <svg
                        className="fill-current text-grey-dark h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                      </svg>
                    </div>
                </div> 
                </div>*/}
                <div className="border p-4 rounded flex flex-col shadow-xl">
                  <div className="w-1/2  pb-2 pl-1 font-normal text-grey-darkest">
                    Github Stats of{" "}
                    <a
                      href={`https://github.com/${userInfo?.username}`}
                      className="font-semibold italic text-lg"
                    >
                      {userInfo?.username}
                    </a>
                  </div>
                  <div className="flex flex-row flex-wrap items-start">
                    <img
                      src={`https://github-readme-stats.vercel.app/api?username=${userInfo?.username}&show_icons=true&locale=en`}
                      alt=".."
                      className="mr-4 mb-4"
                    />
                    <img
                      src={`https://github-readme-stats.vercel.app/api/top-langs?username=${userInfo?.username}&show_icons=true&locale=en&layout=compact`}
                      alt=".."
                      className="mb-4"
                    />
                  </div>
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${userInfo?.username}`}
                    alt=".."
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
