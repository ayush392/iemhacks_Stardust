import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function EditProfile() {
  // const url = `https://devconnect-rwj2.onrender.com/api/user`
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.userInfo;
  // console.log(data);
  const { user } = useAuthContext();
  const id = data._id;

  const [ischecked, setIsChecked] = useState(data?.isAvailable);
  const [formData, setFormData] = useState({
    fullName: data?.fullName,
    bio: data?.bio,
    college: data.education?.college,
    degree: data.education?.degree,
    fieldOfStudy: data.education?.fieldOfStudy,
    edu_from: data.education?.from,
    edu_to: data.education?.to,
    linkedin: data.urls?.linkedin,
    portfolio: data.urls?.portfolio,
    github: data.urls?.github,
    skills: data?.skills,
  });

  const {
    fullName,
    bio,
    college,
    degree,
    fieldOfStudy,
    edu_from,
    edu_to,
    linkedin,
    portfolio,
    github,
    skills,
  } = formData;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleToggle() {
    setIsChecked(!ischecked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData, 33);
    try {
      const response = await fetch(
        `https://devconnect-rwj2.onrender.com/api/user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            fullName,
            bio,
            isAvailable: ischecked,
            college,
            degree,
            fieldOfStudy,
            edu_from,
            edu_to,
            linkedin,
            portfolio,
            github,
            skills,
          }),
        }
      );
      if (response.ok) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="m-10 mx-auto xl:max-w-7xl md:max-w-4xl max-w-2xl">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-3xl mb-3">Edit Profile</h1>

          <div className="form-check form-switch">
            <label className="form-check-label">Set Status</label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              onChange={handleToggle}
              id="flexSwitchCheckChecked"
              checked={!!ischecked}
            />
          </div>
        </div>
        <form className="flex flex-col">
          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={handleChange}
              name="fullName"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>

          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Bio</label>
            <input
              type="text"
              value={bio}
              onChange={handleChange}
              name="bio"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>

          <h3 className="font-bold text-xl">Education</h3>

          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">College</label>
            <input
              type="text"
              value={college}
              onChange={handleChange}
              name="college"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>
          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Degree</label>
            <input
              type="text"
              value={degree}
              onChange={handleChange}
              name="degree"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>
          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Field of study</label>
            <input
              type="text"
              value={fieldOfStudy}
              onChange={handleChange}
              name="fieldOfStudy"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>
          <div className="flex p-0 m-0 flex-row">
            <div className="flex flex-row items-center mb-2 flex-1">
              <label className="w-full flex-1">From Year</label>
              <input
                type="text"
                value={edu_from}
                onChange={handleChange}
                name="edu_from"
                className="px-[.375rem] py-2 bg-gray-200 rounded-md w-full flex-1"
              />
            </div>
            <div className="flex flex-row items-center mb-2 flex-1">
              <label className="w-full flex-1 pl-8">To Year</label>
              <input
                type="text"
                value={edu_to}
                onChange={handleChange}
                name="edu_to"
                className="px-[.375rem] py-2 bg-gray-200 rounded-md w-full flex-1"
              />
            </div>
          </div>

          <h3 className="font-bold text-xl">Profile Links</h3>

          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Linkedin Url</label>
            <input
              type="text"
              value={linkedin}
              onChange={handleChange}
              name="linkedin"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>
          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Portfolio Url</label>
            <input
              type="text"
              value={portfolio}
              onChange={handleChange}
              name="portfolio"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>
          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">Github Url</label>
            <input
              type="text"
              value={github}
              onChange={handleChange}
              name="github"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>

          <h3 className="font-bold text-xl">Skills</h3>
          <div className="flex flex-row items-center mb-2">
            <label className="w-full flex-1">
              Skills (<small>separated by comma</small>){" "}
            </label>
            <input
              type="text"
              value={skills}
              onChange={handleChange}
              name="skills"
              className="px-3 py-2 bg-gray-200 rounded-md w-full flex-[3]"
            />
          </div>

          <div className="flex flex-row  space-x-10">
            <button
              className="bg-black text-white px-4 py-2 mt-3 rounded-md w-full"
              onClick={() => navigate(`../user/${id}`, { replace: true })}
            >
              GO BACK
            </button>
            <button
              className="bg-black text-white px-4 py-2 mt-3 rounded-md w-full"
              type="submit"
              onClick={handleSubmit}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
