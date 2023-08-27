import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "../components/Card";
import { Link, useNavigate, useParams } from "react-router-dom";

function SearchPage() {
  const { user } = useAuthContext();
  const { query } = useParams();

  const [data, setData] = useState([]);
  const [currUser, setCurrUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/user/search/${query}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => console.log(e));

    user &&
      fetch(`http://localhost:4000/api/user/info/${user?.id}`)
        .then((res) => res.json())
        .then((json) => {
          setCurrUser(json);
          console.log(json, "home73");
        })
        .catch((e) => console.log(e));
  }, [user, query]);

  return (
    <>
      <div className="px-3 mx-auto max-w-7xl">
        <h1>Search results for: {query}</h1>
        <div className="m-auto max-w-sm md:max-w-3xl xl:max-w-7xl container">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 1280: 3 }}
          >
            <Masonry gutter={"1.5rem"}>
              {data &&
                data
                  .filter((x) => user.id !== x._id)
                  .map((x, index) => {
                    return (
                      <Card
                        key={index}
                        data={x}
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                        className="max-w-[400px]"
                      />
                    );
                  })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
