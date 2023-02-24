import { Avatar, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useNavigate } from "react-router-dom";
import CreatePostModel from "./CreatePostModel";
import { useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const User = useSelector((state) => state.User);

  const logOutUser = () => {
    localStorage.clear();
    alert("logged Out");
    navigate("/login");
  };

  const toggleShow = () => {
    setShow(!show);
  };

  // ? MODAL FUNCTIONS
  const HandleModalOpen = () => {
    setModalOpen(true);
  };
  const HandleModalClose = () => {
    setModalOpen(false);
  };

  // TODO : should solve switch mode error later on
  const activeStyles = document.documentElement.classList.contains("dark")
    ? {
        color: "#fff",
        backgroundColor: "#121212",
      }
    : {
        color: "#000",
        backgroundColor: "#fafafa",
      };

  const switchTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <CreatePostModel
        modalOpen={modalOpen}
        HandleModalClose={HandleModalClose}
        caption=""
        image={null}
        mode="Create"
      />
      <Stack spacing={3} direction="column">
        {/* top */}
        <Stack
          direction={{ xs: "row", md: "column" }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* logo */}
          <Box>
            <h1 className="font-Roboto">INSTAGRAM</h1>
          </Box>
          {/* ! searchBar and buttons  */}
          <Box onClick={toggleShow} className="material-md:hidden block">
            {show ? (
              <CloseIcon className="text-txt-h-l dark:text-txt-h-d active-scale cursor-pointer" />
            ) : (
              <DensityMediumIcon className="text-txt-h-l cursor-pointer dark:text-txt-h-d active-scale" />
            )}
          </Box>
        </Stack>
        {/* drawer  */}
        <Box
          className={`${
            show ? "flex" : "hidden"
          } material-md:flex h-fit items-center py-3 gap-y-2 material-md:gap-y-5 justify-center w-full flex-col`}
        >
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            className="link group w-[80%]"
          >
            <HomeIcon className="group-hover:scale-110" /> &nbsp; Home
          </NavLink>
          <NavLink
            // to='/profile/:id'
            to={`/profile/${User?._id}`}
            style={({ isActive }) => (isActive ? activeStyles : null)}
            className="link group w-[80%] "
          >
              <Avatar
                sx={{ width: 26, height: 26 }}
                src={User?.profilePhoto ? User?.profilePhoto : ''}
              />
            &nbsp; Profile
          </NavLink>
          <Box className="link group w-[80%] " onClick={HandleModalOpen}>
            <CreateIcon className="group-hover:scale-110" /> &nbsp; Create
          </Box>
          <Box className="link group w-[80%]" onClick={switchTheme}>
            <DarkModeIcon className="group-hover:scale-110" /> &nbsp; Theme
          </Box>
          <Box className="link group w-[80%]" onClick={logOutUser}>
            <LogoutIcon className="group-hover:scale-110" /> &nbsp; Log Out
          </Box>
          <Box className="link group w-[80%]" onClick={()=> navigate(-1)}>
            <ArrowBackIcon className="group-hover:scale-110" /> &nbsp; Go Back
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Header;
