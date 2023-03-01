import React, { useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, PostSelectors, setPosts } from "../slices/PostSlice";
import Post from "../components/Post";

const Feed = () => {

  const dispatch = useDispatch();
  const allPosts = useSelector(PostSelectors.selectAll);
  const { loading, error } = useSelector(state => state.Post)
  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch]);

  return (
    <>
      {/* posts */}
      <Stack
        spacing={2}
        className="w-full min-h-screen small-mobile:w-fit flex items-center justify-center pb-5"
      >
        {loading && <CircularProgress />}
        {error && <h1>Error</h1>}
        {(!loading && allPosts) &&
          (allPosts?.length === 0 ? (
            <h1>no data</h1>
          ) : (
            allPosts?.map((item) => {
              return <Post key={item._id} item={item} />;
            })
          ))}
      </Stack>
    </>
  );
};

export default Feed;
