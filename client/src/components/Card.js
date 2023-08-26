import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Card = ({ data, currUser, setCurrUser }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState('');

  useEffect(() => {
    // console.log(currUser, 'card 11');
    const c1 = data?.connections?.findIndex(x => x === user.id);
    const c2 = currUser && currUser.connections?.findIndex(x => x === data._id);

    if (c1 !== -1 && c2 !== -1)
      setStatus('Message');
    else if (c1 !== -1)
      setStatus('Accept');
    else if (c2 !== -1)
      setStatus('Pending');
    else
      setStatus('Connect');

  }, [user, currUser]);

  async function connectUser(id) {
    if (status === 'Message' || status === 'Pending') {
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
          status: status
        }),
      });
      const response = await res.json();
      console.log(response);
      setCurrUser(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {console.log(currUser, 'card51')}
      <Link
        to={`/user/${data._id}`}
        className="border-[1px] border-gray-300 rounded-xl p-4 max-w-[400px] bg-white bg-opacity-80 cardnew shadow-xl ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-5 justify-start">

            <img
              src={data.profile_img}
              alt="profile"
              className="rounded-full h-16 w-16 object-cover"
            />
            <div className="my-auto">
              <h4 className="font-semibold text-lg">
                {data.fullName}
                <span className="text-xs"> #{data.username}</span>
              </h4>

              <p className="text-sm">{data.email}</p>
            </div>
          </div>
          <button
            className="bg-blue-300 text-white p-1 rounded-xl px-2 py-1 text-xs font-semibold max-h-[30px]"
            onClick={() => connectUser(data._id)}
          >
            {/* <img src="/connect.svg" alt="c" /> */}
            <span className="text-black">{status.toUpperCase()}</span>
          </button>
        </div>

        <div>
          {data.bio && <p className="text-sm mx-2">{data.bio}</p>}
          {data.skills.length !== 0 && <h4 className="mx-2 mt-4 mb-2">Skills</h4>}
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
        </div>
      </Link>
    </>
  );
};

export default Card;
