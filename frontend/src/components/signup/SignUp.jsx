import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../services/AuthEndpoints";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [signUp, { isError, error, isLoading, data }] = useSignUpMutation();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const signUpTheUser = async (e) => {
    e.preventDefault();

    signUp({
      username,
      email,
      password,
    });

    if (!isLoading) {
      if (isError) {
        toast.error(error.data.msg);
      } else {
        toast.success(data.msg);
        navigate("/login");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <div className="bg-no-repeat instagram-logo" />
        <form className="mt-8 w-64 flex flex-col" onSubmit={signUpTheUser}>
          <input
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="username"
            placeholder="Enter Your Username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          <input
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="email"
            placeholder="Enter Your Email"
            type="email"
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter Your Password"
            type="password"
            required
          />
          <button
            type="submit"
            className="active-scale text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Already have an account? &nbsp; </span>
        <Link to="/login" className="text-blue-500 text-sm font-semibold">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
