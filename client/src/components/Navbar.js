import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [query, setQuery] = useState("");
  const [currUser, setCurrUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/user/info/${user?.id}`)
      .then((res) => res.json())
      .then((json) => setCurrUser(json))
      .catch((e) => console.log(e));
  }, [user]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    navigate(`/search/${query}`);
  }

  return (
    <>
      <nav className="navbar align-items-center mobile bg-white shadow-md">
        <Link
          to={"/"}
          className="navbar-brand ms-2 ps-1 text-4xl font-semibold font-tulpen"
        >
          DevConnect
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-50"
          role="search"
        >
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search "
              aria-label="Search"
              aria-describedby="mobile-search-btn"
            />
            <button
              onClick={handleSearch}
              className="btn btn-outline-secondary btn-sm"
              type="submit"
              id="mobile-search-btn"
            >
              🔍
            </button>
          </div>
        </form>

        <div className=" me-2 pe-1">
          {user ? (
            <div className="btn-group">
              <span
                role="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <img
                  width="30px"
                  className="rounded-full object-cover"
                  src={`${currUser?.profile_img}`}
                  alt="."
                />
              </span>
              <ul
                className="dropdown-menu dropdown-menu-start"
                style={{ translate: "-80%" }}
              >
                <li>
                  <Link
                    to={`../user/${currUser?._id}`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigate(`/edit/${currUser?._id}`, {
                        state: { userInfo: currUser },
                      })
                    }
                    className="dropdown-item"
                  >
                    Edit Profile
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => logout()}>
                    Logout @{currUser?.username}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-outline-dark" to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </nav>

      <nav className="navbar align-items-center desktop justify-between bg-white shadow-md ">
        {/* <div className='flex flex-row items-center'> */}
        <Link
          to={"/"}
          className="navbar-brand ms-5 text-4xl font-semibold font-tulpen"
        >
          DEVCONNECT
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-[800px] max-w-[70vw]"
          role="search"
        >
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="desktop-search-btn"
            />
            <button
              onClick={handleSearch}
              className="btn btn-primary text-blue-700 hover:text-white"
              type="submit"
              id="desktop-search-btn"
            >
              Search
            </button>
          </div>
        </form>

        {/* </div> */}
        <div className=" me-5">
          {user ? (
            <>
              <div className="btn-group">
                <div
                  className="flex flex-row"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                >
                  <span className="me-3">{currUser?.email}</span>
                  <img
                    width="30px"
                    className="rounded-full object-cover"
                    src={`${currUser?.profile_img}`}
                    alt="."
                  />
                </div>
                <ul className="dropdown-menu dropdown-menu-start">
                  <li>
                    <Link
                      to={`../user/${currUser?._id}`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        navigate(`/edit/${currUser?._id}`, {
                          state: { userInfo: currUser },
                        })
                      }
                      className="dropdown-item"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => logout()}>
                      Logout @{currUser?.username}
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link className="btn btn-outline-dark" to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
