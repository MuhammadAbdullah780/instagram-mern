import React, { useRef, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreatePostModel from "./CreatePostModel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAddCommentMutation,
  useAddLikeMutation,
  useDeletePostMutation,
  useRemoveLikeMutation,
} from "../services/PostEndpoints";
import { addComment, deletePost, likePost, unLikePost } from "../slices/PostSlice";

function Post({ item, children }) {
  const User = useSelector((state) => state.User);
  const commentRef = useRef("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    dispatch(deletePost(item._id)).then(()=> {
      closeDropdown();
    })
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // ? MODAL FUNCTIONS
  const HandleModalOpen = () => {
    setModalOpen(true);
    closeDropdown();
  };
  const HandleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CreatePostModel
        modalOpen={modalOpen}
        HandleModalClose={HandleModalClose}
        caption={item.caption}
        image={item.image}
        mode="Update"
        postId={item._id}
      />
      <Stack className='dark:bg-black my-border rounded-md  bg-white small-mobile:w-[450px] w-full py-1'>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="px-4 py-3"
        >
          <Box className="flex gap-x-3 items-center">
            <Link to={`/profile/${item.postedBy}`}>
              <Avatar
                alt={item.username}
                sx={{ width: 32, height: 32 }}
                src={item.userPhoto ? item.userPhoto : ""}
              />
            </Link>
            <Link to={`/profile/${item.postedBy}`}>
              <Typography
                component="h6"
                variant="subtitle1"
                className="font-bold dark-text cursor-pointer"
              >
                {item.username}
              </Typography>
            </Link>
          </Box>
          <Box>
            {item.username === User?.username && (
              <Box className="relative">
                <MoreHorizIcon
                  className="cursor-pointer dark-text"
                  onClick={toggleDropdown}
                />
                {/* DROPDOWN */}
                <div
                  className={` ${
                    dropdownOpen ? "scale-100" : "scale-0"
                  }  absolute right-0 z-10 w-max p-4 mt-4 origin-top-right bg-main-l-bg dark:bg-main-d-bg my-border rounded-md`}
                >
                  <div className="flex items-center justify-center flex-col">
                    <button
                      className="block active-scale px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                      onClick={HandleModalOpen}
                    >
                      Edit Post &nbsp; <EditIcon />
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="block active-scale px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                    >
                      Delete Post &nbsp; <DeleteIcon />
                    </button>
                  </div>
                </div>
              </Box>
            )}
          </Box>
        </Box>
        {/* POST IMAGE */}
        <LazyLoadImage
          className="h-96 aspect-post object-cover"
          onDoubleClick={
            item.likes.includes(User?._id)
              ? () => {
                dispatch(unLikePost(item._id))
                }
              : () => {
                dispatch(likePost(item._id))
                }
          }
          src={item.image}
          alt={item.username}
        />
        <Stack spacing={1} className="py-1">
          <Box className="flex items-center px-3 justify-between">
            <Box className="flex gap-x-4">
              {item.likes.includes(User?._id) ? (
                <FavoriteIcon
                  className='dark-text active-scale'
                  style={{ fill: "#FD1D1D" }}
                  onClick={() => dispatch(unLikePost(item._id))}
                />
              ) : (
                <FavoriteBorderIcon
                  className="dark-text active-scale dark:fill-white fill-black"
                  onClick={() => dispatch(likePost(item._id))}
                />
              )}
              <Link to={`/p/${item._id}`}>
                <ModeCommentOutlinedIcon className="dark-text active-scale" />
              </Link>
            </Box>
          </Box>
          {/* How many likes */}
          <Box className="px-2">
            <Typography variant="subtitle2">{`${item?.likes.length} Likes`}</Typography>
            {/* timestamp */}
            <Typography variant="caption" component="p">
              <small>{moment(item?.createdAt).fromNow()}</small>
            </Typography>
            <Typography component="p" variant="caption" className="mb-2">
              <span>{item.caption}</span>
            </Typography>
          </Box>

          <Box>{children}</Box>
          {/* comment box  */}
          {location.pathname === `/p/${item._id}` &&
            !(item?.username === User?.username) && (
              <Box className="flex items-center justify-between px-3">
                <input
                  type="text"
                  ref={commentRef}
                  placeholder="Add a comment..."
                  className="bg-transparent outline-none text-sm py-1 rounded-md px-4"
                />
                <button
                  className="text-insta-blue background-transparent font-bold px-3 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    dispatch(
                      addComment({
                        id: item._id,
                        data: commentRef.current.value,
                      })
                    )
                    commentRef.current.value = "";
                    navigate(`/p/${item._id}`);
                  }}
                >
                  Post
                </button>
              </Box>
            )}
        </Stack>
      </Stack>
    </>
  );
}

export default React.memo(Post);
