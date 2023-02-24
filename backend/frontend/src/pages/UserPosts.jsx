import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useGetSelectedUserPostsQuery } from "../services/ProfileEndpoints";
import { useLocation } from "react-router-dom";
import UserImagePost from '../components/UserImagePost'



const UserPosts = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, isLoading, isSuccess, isError, error } = useGetSelectedUserPostsQuery(id);

  return (
    <>
      {isLoading && <CircularProgress />}
      {isError && <h1>{error?.data?.msg}</h1>}
      <Box className="grid grid-cols-1 small-mobile:grid-cols-2 sm:grid-cols-3 gap-4 px-3">
        {isSuccess &&
          (data?.Posts?.length > 0 ? (
            data?.Posts?.map((item) => (
              <UserImagePost item={item} key={item._id} />
            ))
          ) : (
            <h1 className="m-auto" >No Posts</h1>
          ))}
      </Box>
    </>
  );
};

export default UserPosts;
