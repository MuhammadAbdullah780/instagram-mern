import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useLogInMutation } from "../../services/AuthEndpoints";
import { toast } from "react-hot-toast";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const token = JSON.parse(localStorage.getItem("token"))
  const [logIn, { error, isSuccess, isLoading, data }] = useLogInMutation()
  const navigate = useNavigate()

  useEffect(()=> {
    if (token) {
      navigate("/")
    }
  },[token, navigate])



  const logInUser = async (e)=> {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    logIn({
      email,
      password
    })
    if(isSuccess && !isLoading) {
        localStorage.setItem("token", JSON.stringify(data.token))
        toast.success(data.msg)
        navigate("/")
    }
    if(error) {
      toast.error(error)
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <div className="bg-no-repeat instagram-logo" />
        <form className="mt-8 w-64 flex flex-col" onSubmit={logInUser} >
          <input
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="email"
            placeholder="Phone number, username, or email"
            type="email"
            ref={emailRef}
            required
          />
          <input
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="password"
            placeholder="Password"
            type="password"
            required
            ref={passwordRef}
          />
          <button type="submit" className="active-scale text-sm text-center bg-blue-300 text-white py-1 rounded font-medium">
            Log In
          </button>
        </form>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Don't have an account? &nbsp; </span>
        <Link to='/signup' className="text-blue-500 text-sm font-semibold">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
