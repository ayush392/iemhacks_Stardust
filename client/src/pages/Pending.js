import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useAuthContext } from "../hooks/useAuthContext";

function Pending() {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    console.log(user);
    user &&
      fetch(
        `https://devconnect-server.onrender.com/api/user/pending/${user?.id}`
      )
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((e) => console.log(e));

    user &&
      fetch(`https://devconnect-server.onrender.com/api/user/info/${user?.id}`)
        .then((res) => res.json())
        .then((json) => {
          setCurrUser(json);
          console.log(json, "home73");
        })
        .catch((e) => console.log(e));
  }, [user]);

  return (
    <>
      {console.log(data, "pending29")}
      <div>Pending Page</div>

      {data && data.length === 0 ? (
        <h1 className="font-bold text-2xl">No pending connection request</h1>
      ) : (
        <div className=" m-auto max-w-sm md:max-w-3xl xl:max-w-7xl">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 1280: 3 }}
          >
            <Masonry gutter={"1rem"}>
              {data &&
                data.map((x, index) => (
                  <Card
                    key={index}
                    data={x}
                    currUser={currUser}
                    setCurrUser={setCurrUser}
                    className="max-w-[400px]"
                  />
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </>
  );
}

export default Pending;
