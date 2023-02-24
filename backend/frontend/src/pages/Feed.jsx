import React, { useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useGetAllPostsQuery } from "../services/PostEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { PostSelectors, setPosts } from "../slices/PostSlice";
import Post from '../components/Post'


const Feed = () => {
  const { data, error, isLoading, isSuccess } = useGetAllPostsQuery();
  const dispatch = useDispatch();
  const allPosts = useSelector(PostSelectors.selectAll);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      dispatch(setPosts(data));
    }
  }, [isLoading, isSuccess, dispatch, data]);

  return (
    <>
      {/* posts */}
      <Stack
        spacing={2}
        className="w-full min-h-screen small-mobile:w-fit flex items-center justify-center pb-5"
      >
        {isLoading && <CircularProgress/>}
          {error && <h1>Error</h1>}
          {isSuccess &&
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
