import { Box, Skeleton } from "@mui/material";
import React from "react";

const UserInfoSkeleton = () => {
  return (
    <>
      <Box className="my-1 w-[70%] mobile:w-[40%]">
        <Skeleton animation="pulse" variant="text" />
      </Box>
      <Box className="flex items-center justify-start gap-x-5 w-[70%] mobile:w-[40%]">
        <Skeleton animation="pulse" variant="text" className="w-10"  />
        <Skeleton animation="pulse" variant="text" className="w-10"  />
        <Skeleton animation="pulse" variant="text" className="w-10"  />
      </Box>
      <Box className="w-[70%] mobile:w-[40%]">
        <Skeleton animation="pulse" variant="text" />
        <Skeleton animation="pulse" variant="text" />
      </Box>
    </>
  );
};

export default UserInfoSkeleton;
