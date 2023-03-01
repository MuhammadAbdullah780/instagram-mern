import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/AuthApi";
import Svg from '../loadingSvg'


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [completed, setCompleted] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signUpTheUser = async (e) => {
    setCompleted(false)
    e.preventDefault();
    authApi.signUp({
      username,
      email,
      password,
    }).then((data)=> {
      toast.success(data.msg);
      navigate("/login");
      setCompleted(true);
    }).catch((err)=> {
      toast.error(err.response.data.msg)
      setCompleted(true);
    })
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
          />
          <button
            type="submit"
            className="active-scale text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
          >
            <Svg completed={completed} />
            {completed ? 'Sign Up' : "Loading..."}
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
