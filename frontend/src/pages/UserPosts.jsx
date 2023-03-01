import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useGetSelectedUserPostsQuery } from "../services/ProfileEndpoints";
import { useLocation } from "react-router-dom";
import UserImagePost from '../components/UserImagePost'
import { useSelector } from "react-redux";
import { PostSelectors } from "../slices/PostSlice";



const UserPosts = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const posts = useSelector(PostSelectors.selectAll)
  console.log("posts: ", posts);
  const userPosts = posts.filter(item => item.postedBy === id)

  console.log("userPosts: ", userPosts);

  return (
    <>
      <Box className="grid grid-cols-1 small-mobile:grid-cols-2 sm:grid-cols-3 gap-4 px-3">
          {userPosts.length > 0 ? (
            userPosts.map((item) => (
              <UserImagePost item={item} key={item._id} />
            ))
          ) : (
            <h1 className="m-auto" >No Posts</h1>
          )}
      </Box>
    </>
  );
};

export default UserPosts;
