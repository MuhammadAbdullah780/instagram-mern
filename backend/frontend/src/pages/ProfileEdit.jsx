import React, { useState } from "react";
import { Input, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEditLoggedInUserMutation } from "../services/ProfileEndpoints";
import { toast } from "react-hot-toast";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.User);
  const [bio, setBio] = useState(User?.bio || "");
  const [username, setUsername] = useState(User?.username || "");
  const [email, setEmail] = useState(User?.email || "");
  const [image, setImage] = useState(User?.image || null);
  const [editLoggedInUser] = useEditLoggedInUserMutation();


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

  return (
    <Stack
      spacing={3}
      className="pt-5 w-full h-full min-h-[70vh] flex justify-center bg-white dark:bg-black my-border items-center gap-x-8 material-md:gap-x-20 lg:w-5/6 material-md:w-4/5"
    >
      <Typography variant="h5" className="font-Poppins">
        Edit Your Profile
      </Typography>
      <form className="flex items-center justify-center gap-4 flex-col">
        <input
          type="text"
          className="w-80 h-full outline-none text-sm bg-white dark:bg-black my-border rounded-sm px-2 py-1"
          value={bio}
          required
          onChange={(e) => {
            setBio(e.target.value);
          }}
          placeholder="Edit Bio..."
        />
        <input
          type="text"
          className="w-80 h-full outline-none text-sm bg-white dark:bg-black my-border rounded-sm px-2 py-1"
          placeholder="Change Your Username..."
          value={username}
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          className="w-80  h-full outline-none text-sm bg-white dark:bg-black my-border rounded-sm px-2 py-1"
          placeholder="Edit Your Email..."
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          className="block w-80 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          disableUnderline
          required
          type="file"
          onChange={onImageChange}
        />
        <img
          src={
            image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGr6XdnLSaDOoeDAUzGhexqjXATZCTrkmyQ&usqp=CAU"
          }
          alt="name"
        />

        <button
          type="submit"
          className="active-scale my-border text-black dark:text-white rounded-md px-5 py-1 bg-white dark:bg-black"
          onClick={(e) => {
            e.preventDefault();
            image &&
              editLoggedInUser({
                id: User?._id,
                bio,
                username,
                image,
                email,
              }).then(()=> {
                navigate(-1)
                toast.success('Successfully Updated Profile')
              }).catch(()=> {
                toast.error('Error Updating Profile')
              })
          }}
        >
          Save Changes
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
        className="active-scale my-border text-black dark:text-white rounded-md px-5 py-1 bg-white dark:bg-black"
      >
        Go Back
      </button>
    </Stack>
  );
};

export default ProfileEdit;
