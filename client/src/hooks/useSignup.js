import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async function (email, password, username, fullName) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://devconnect-server.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password, username, fullName }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      // throw new Error(json.error);
    }

    if (response.ok) {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update authContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      navigate(`../user/${json.id}`);
    }
  };

  return { signup, isLoading, error };
};
