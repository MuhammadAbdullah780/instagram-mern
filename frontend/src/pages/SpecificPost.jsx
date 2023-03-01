import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Post from "../components/Post";
import { PostSelectors, selectById, deleteComment } from "../slices/PostSlice";

const SpecificPost = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const id = location.pathname.split("/")[2];
  const specificPost = useSelector((state) =>
    PostSelectors.selectById(state, id)
  );

  return (
    <>
      <Post item={specificPost}>
        <Box className="py-3">
          <Stack className="flex items center justify-between px-3 ">
            {specificPost?.comments.length > 0 && (
              <h6 className="text-sm font-bold">Comments</h6>
            )}
            {/* SERIES OF COMMENTS */}
            <Box spacing={1} className="h-fit">
              {/* ACTUAL COMMENT */}
              {specificPost?.comments.length > 0 &&
                specificPost?.comments?.map((comment) => (
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
                      specificPost?.username === User?.username) && (
                      <DeleteIcon
                        className="active-scale"
                        onClick={() => {
                          console.log("id: ", specificPost._id);
                          console.log("commentId: ", comment._id);
                          dispatch(
                            deleteComment({
                              commentId: comment._id,
                              postId: specificPost._id,
                            })
                          );
                        }}
                      />
                    )}
                  </Box>
                ))}
            </Box>
          </Stack>
        </Box>
      </Post>
    </>
  );
};

export default SpecificPost;
