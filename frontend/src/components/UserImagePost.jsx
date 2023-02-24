import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddLikeMutation,
  useRemoveLikeMutation,
} from "../services/PostEndpoints";

const UserImagePost = ({ item }) => {
  const User = useSelector((state) => state.User);
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  return (
    <Box className="relative group h-auto w-full object-cover">
      <LazyLoadImage className="h-72 aspect-post" src={item?.image} alt={item?.caption} />
      <Stack
        direction="row"
        spacing={4}
        className="absolute h-72 group-hover:flex items-center justify-center hidden transition-colors duration-300 w-full top-0 left-0 bg-black bg-opacity-40 z-10"
      >
        {/* LIKES */}
        <Typography className="post-text">
          {item.likes.includes(User?._id) ? (
            <FavoriteIcon
              style={{ fill: "#FD1D1D" }}
              className="dark-text active-scale "
              onClick={() => removeLike(item._id)}
            />
          ) : (
            <FavoriteBorderIcon
              className="dark-text active-scale"
              style={{ fill: "#ffffff" }}
              onClick={() => addLike(item._id)}
            />
          )}
        </Typography>
        <Link to={`/p/${item._id}`} >
          <VisibilityIcon
            className="active-scale"
            style={{ fill: "#ffffff" }}
          />
        </Link>
      </Stack>
    </Box>
  );
};

export default UserImagePost;
