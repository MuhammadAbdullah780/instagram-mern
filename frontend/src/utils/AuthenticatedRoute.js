import React from 'react'
import {Navigate, Outlet} from "react-router-dom"

const AuthenticatedRoute = () => {
  const token = JSON.parse(localStorage.getItem("token"));
    return (
        token ? <Navigate to='/'/> : <Outlet/> 
    )
};

export default AuthenticatedRoute;