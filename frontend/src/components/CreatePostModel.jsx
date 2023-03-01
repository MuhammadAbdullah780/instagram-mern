import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Stack,
  Avatar,
  Input,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addPost, updatePost } from "../slices/PostSlice";
import  Svg from './loadingSvg'

const CreatePostModel = ({
  modalOpen,
  HandleModalClose,
  caption,
  image,
  mode,
  postId,
}) => {
  const User = useSelector((state) => state.User);
  const [Image, setImage] = useState(image);
  const [input, setInput] = useState(caption);
  const [completed, setCompleted] = useState(true);
  const dispatch = useDispatch();
  // * SUBMITTING POST LOGIC
  const handleCreatePost = (e) => {
    e.preventDefault();
    try {
      console.log("image: ", Image);
      console.log("caption: ", input);
      dispatch(
        addPost({
          data: {
            image: Image,
            caption: input,
          },
        })
      ).then(() => {
        setCompleted(true);
        setImage(null);
        setInput("");
        toast.success('Post Created Successfully')
        HandleModalClose();
      });
    } catch (error) {}
  };

  // * UPDATING POST LOGIC
  const handleUpdatePost = (e) => {
    e.preventDefault();
    console.log("postId: ", postId);
    dispatch(
      updatePost({
        id: postId,
        data: {
          image: Image,
          caption: input,
        },
      })
    ).then(() => {
      setCompleted(true);
      setImage(null);
      HandleModalClose();
      setInput("");
      toast.success('Post Updated Successfully')
    })
  };

  // * LOGIC FOR DISPLAYING THE SELECTED IMAGE
  const onImageChange = (event) => {
    if (event.target.files[0].size > 70000) {
      alert("file is too large");
      setImage(null);
    } else {
      if (event?.target?.files.length && event?.target?.files[0]) {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImage("");
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={HandleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <Box className="">
          <form
            method="post"
            onSubmit={mode === "Create" ? handleCreatePost : handleUpdatePost}
          >
            <Stack
              sx={style}
              spacing={2}
              className="bg-main-l-bg w-[90%] sm:w-96 dark:bg-main-d-bg my-border outline-none flex items-center rounded-md justify-center"
            >
              {/* USER INFO */}
              <Link
                to={`/profile/${User?._id}`}
                onClick={HandleModalClose}
                className="flex items-center justify-start gap-x-1 px-2 py-1 w-[70%]"
              >
                <Avatar
                  sx={{ height: 30, width: 30 }}
                  alt={User?.username}
                  src={User?.profilePhoto || ""}
                />
                &nbsp;
                <Typography
                  variant="caption"
                  component="h4"
                  className="text-black dark:text-white font-semibold font-Roboto"
                >
                  {User?.username || 'User' }
                </Typography>
              </Link>
              <Box className="flex items-center justify-start w-[70%]">
                <input
                  type="text"
                  className="w-full h-full outline-none text-sm bg-white dark:bg-black my-border rounded-sm px-2 py-1"
                  required
                  value={input}
                  onChange={({ target }) => setInput(target.value)}
                  placeholder="Enter Your Post's Caption..."
                />
              </Box>
              <Box className="flex gap-x-2 items-center justify-start w-[70%]">
                <Input
                  type="file"
                  disableUnderline
                  onChange={onImageChange}
                  className="w-full h-full outline-none text-sm bg-white dark:bg-black my-border rounded-sm"
                  required
                />
              </Box>
              <Box className="flex gap-x-2 items-center justify-start w-[70%] text-sm">
                <button
                  type="submit"
                  className="active-scale my-border text-black dark:text-white rounded-md px-5 py-1 bg-white dark:bg-black"
                  onClick={() => setCompleted(false)}
                >
                  <Svg completed={completed}/>
                  { completed ? `${mode} Post` : 'Loading...' }
                </button>
                <button
                  type="button"
                  onClick={HandleModalClose}
                  className="active-scale my-border text-black dark:text-white rounded-md px-5 py-1 bg-white dark:bg-black"
                >
                  Cancel
                </button>
              </Box>
              <img
                src={
                  Image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGr6XdnLSaDOoeDAUzGhexqjXATZCTrkmyQ&usqp=CAU"
                }
                alt="#"
              />
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreatePostModel;
