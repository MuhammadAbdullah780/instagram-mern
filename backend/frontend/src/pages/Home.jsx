import React, { Suspense, useEffect } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useGetLoggedInUserQuery } from "../services/ProfileEndpoints";
import { useDispatch } from "react-redux";
import { getUser } from "../slices/UserSlice";

const Home = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { data, isFetching, isError } = useGetLoggedInUserQuery();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (!isFetching && !isError) {
      dispatch(
        getUser({
          user: data.user,
          token: JSON.parse(localStorage.getItem("token")),
        })
      );
    }
  }, [data, dispatch, isFetching, token, isError]);

  return (
    <Stack
      display="flex"
      alignItems={{ xs: "center", md: "start" }}
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="flex-start"
      className="min-h-screen"
    >
      {/* header */}
      <Box className="w-full sticky material-md:top-0 material-md:left-0 lg:w-1/6 material-md:w-1/5 material-md:h-screen h-fit p-3 dark:bg-black bg-white my-border">
        <Header />
      </Box>
      {/* main content */}
      <Box className="material-md:pt-5 w-full h-full min-h-[100vh] flex justify-center items-start gap-x-8 material-md:gap-x-20 lg:w-5/6 material-md:w-4/5">
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </Box>
    </Stack>
  );
};

export default Home;
