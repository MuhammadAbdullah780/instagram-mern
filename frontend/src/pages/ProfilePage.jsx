import React, { Suspense } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetSelectedUserQuery,
  useUnFollowUserMutation,
} from "../services/ProfileEndpoints";
import UserInfoSkeleton from "../components/skeletons/UserInfoSkeleton";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const User = useSelector((state) => state.User);
  const { data, isLoading, isSuccess } = useGetSelectedUserQuery(id);
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();

  return (
    // ! THIS SECTION IS ALL ABOUT USERS
    <Stack
      spacing={2}
      className="material-md:w-[70%] w-full rounded-md sm:m-5 py-3 my-border dark:bg-black bg-white "
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} className="">
        {/* //* PROFILE PHOTO */}
        <Box className="w-full flex items-center p-3 mobile:w-[30%] justify-start mobile:justify-center">
          {isLoading && (
            <Skeleton
              animation="pulse"
              variant="circular"
              width={130}
              height={130}
            />
          )}
          {isSuccess && (
            <Avatar
              src={data?.User?.profilePhoto || ""}
              alt="name"
              className="h-32 w-32 rounded-full"
            />
          )}
        </Box>
        {/* // * USER INFO */}
        <Stack spacing={1} className="w-full mobile:pt-3 px-3 mobile:w-[70%]">
          {isLoading && <UserInfoSkeleton />}
          {isSuccess && (
            <>
              <Box className="my-1">
                <Typography variant="subtitle1">
                  <strong className="dark-text">
                    {data?.User?.username || "User"}
                  </strong>{" "}
                  &nbsp;
                  {data?.User?.username === User?.username ? (
                    <Link to="/profile/edit">
                      <SettingsIcon className="cursor-pointer" />
                    </Link>
                  ) : data?.User?.followers?.includes(User?._id) ? (
                    <button
                      className="text-insta-blue background-transparent font-bold px-3 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        unFollowUser(data?.User?._id);
                      }}
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      className="text-insta-blue background-transparent font-bold px-3 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        followUser(data?.User?._id);
                      }}
                    >
                      Follow
                    </button>
                  )}
                </Typography>
              </Box>
              <Box className="flex items-center justify-start gap-x-5 ">
                <Typography variant="caption">
                  <strong>{data?.Posts.length}</strong> Posts
                </Typography>
                <Typography variant="caption">
                  <strong>{data?.User?.followers?.length}</strong> Followers
                </Typography>
                <Typography variant="caption">
                  <strong>{data?.User?.following?.length}</strong> Following
                </Typography>
              </Box>
              <Box className="">
                <Typography variant="subtitle2">
                  <strong>{data?.User?.email}</strong>
                </Typography>
                <Typography variant="caption">
                  {data?.User?.bio || "No Description Entered By User"}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
      {/* 2ND PART OF PAGE THAT IS USER POSTS */}
      <Stack className="">
        <Stack spacing={2} className="w-full">
          <Divider className="bg-border-bg-l dark:bg-border-bg-d opacity-40  h-[1px]" />
          {/* USER POSTS */}
          <Box className="w-full flex items-center justify-center">
            {/* NESTED USER ROUTES */}
            <Suspense fallback={<CircularProgress />}>
              <Outlet />
            </Suspense>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
