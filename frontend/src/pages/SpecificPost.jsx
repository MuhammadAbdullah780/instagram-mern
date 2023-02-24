import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Post from "../components/Post";
import {
  useGetSpecificPostQuery,
  useRemoveCommentMutation,
} from "../services/PostEndpoints";

const SpecificPost = () => {
  const location = useLocation();
  const User = useSelector((state) => state.User);
  const id = location.pathname.split("/")[2];
  const { data, isSuccess, isLoading, isError, error } =
    useGetSpecificPostQuery(id);
  const [removeComment] = useRemoveCommentMutation();

  return (
    <>
      {isLoading && (
        <div className="h-screen w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      {isError && <h1>{error.msg}</h1>}
      {isSuccess && (
        <Post item={data}>
          <Box className="py-3">
            <Stack className="flex items center justify-between px-3 ">
              {data?.comments.length > 0 && (
                <h6 className="text-sm font-bold">Comments</h6>
              )}
              {/* SERIES OF COMMENTS */}
              <Box spacing={1} className="h-fit">
                {/* ACTUAL COMMENT */}
                {data?.comments.length > 0 &&
                  data?.comments?.map((comment) => (
                    <Box
                      className="flex items-center justify-between h-fit"
                      key={comment?._id}
                    >
                      <Box>
                        <Link to={`/profile/${comment?.postedBy}`}>
                          <strong className="text-sm dark-text">
                            {comment?.authorName}
                          </strong>
                        </Link>
                        &nbsp;
                        <small className="text-xs">{comment?.text}</small>
                      </Box>
                      {(comment?.authorName === User?.username ||
                        data?.username === User?.username) && (
                        <DeleteIcon
                          className="active-scale"
                          onClick={() => {
                            console.log("id: ", data._id);
                            console.log("commentId: ", comment._id);
                            removeComment({
                              commentId: comment._id,
                              id: data._id,
                            });
                          }}
                        />
                      )}
                    </Box>
                  ))}
              </Box>
            </Stack>
          </Box>
        </Post>
      )}
    </>
  );
};

export default SpecificPost;
