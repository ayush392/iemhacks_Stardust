import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate()
  let data2 = [
    {
      name: "Aaaa Bbbb",
      email: "abcd@gmail.com",
      bio: " Hey there! I am using DevConnect",
      password: "123456",
      username: "abcd",
      education: {
        school: "ABC School",
        degree: "B. Abc.",
        fieldOfStudy: "ABCD",
        from: "20.02.2024",
        to: "20.02.2025",
      },
      urls: {
        linkedin: "www.linkedin.com/abcd",
        portfolio: "abcd.com",
        github: "www.github.com/abcd",
      },
      skills: [
        "javascript",
        "typescript",
        "javascript",
        "typescript",
        "typescript",
      ],
      profile_img:
        "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png",
    },
    {
      name: "Abcd Abcd",
      email: "abcd@gmil.com",
      password: "123456",
      username: "abcd",
      education: {
        school: "ABC School",
        degree: "B. Abc.",
        fieldOfStudy: "ABCD",
        from: "20.02.2024",
        to: "20.02.2025",
      },
      urls: {
        linkedin: "www.linkedin.com/abcd",
        portfolio: "abcd.com",
        github: "www.github.com/abcd",
      },
      skills: ["ab", "ab", "ab", "ab", "ab"],
      profile_img:
        "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png",
    },
  ];

  const [data, setData] = useState("");
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/user")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(e => console.log(e));

    fetch(`http://localhost:4000/api/user/info/${user?.id}`)
      .then(res => res.json())
      .then(json => {
        setCurrUser(json)
        console.log(json, 'home73');
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <div className="px-3 mx-auto max-w-7xl">
        {currUser ? (<div className="flex flex-row items-center space-x-4 mx-4 py-2 my-4">
          <Link to={`/user/${currUser._id}`} className="font-bold text-2xl pb-1">{currUser?.fullName}</Link>
          <button
            onClick={() =>
              navigate(`/edit/${currUser._id}`, { state: { userInfo: currUser } })
            }
          >
            Edit
          </button>
          {/* <Link to={`/edit/${currUser._id}`} className="text-sm">Edit Profile</Link> */}
        </div>
        ) : (
          <h3 className="">Loading...</h3>
        )}
        <div className="m-auto max-w-sm md:max-w-3xl xl:max-w-7xl container">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 1280: 3 }}
          >
            <Masonry gutter={"1.5rem"}>
              {data &&
                data.filter(x => user.id !== x._id).map((x, index) => {
                  return (
                    <Card key={index} data={x} currUser={currUser} setCurrUser={setCurrUser} className="max-w-[400px]" />
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </>
  );
}

export default Home;
