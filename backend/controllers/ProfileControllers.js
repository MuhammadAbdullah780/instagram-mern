const { StatusCodes } = require("http-status-codes");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const cloudinary = require("cloudinary").v2;

const getUserData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetedUser = await User.findOne({ _id: id });
    if (!targetedUser) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        msg: "User Not Found",
      });
    }
    await Post.find({ postedBy: id })
      .then((data) => {
        res.status(200).json({
          User: targetedUser,
          Posts: data,
        });
      })
      .catch((err) => console.log(err));

    // const targetPosts = Post.find({ postedBy: id })
  } catch (error) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.find({ postedBy: id })
      .then((result) => {
        return res.status(200).json({
          Posts: result,
        });
      })
      .catch((err) => {
        return res.status(404).json({
          msg: "Post not found",
        });
      });
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
    });
  }
};

const followUser = async (req, res, next) => {
  try {
    // ye visited user ki id hai
    const { id } = req.params;
    // mene kisi ko follow kia to wo meri following list me aiga aur me uski followers list me jaunga
    // ye simple si logic hai
    User.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { followers: req.user._id } },
      (err, data) => {
        if (err) {
          return res.status(404).json({
            msg: "User not found",
          });
        }
        User.findByIdAndUpdate(
          { _id: req.user._id },
          { $addToSet: { following: id } },
          (err, data) => {
            if (err) {
              return res.status(404).json({
                msg: "You Have to log in first",
              });
            }
            return res.status(200).json({
              msg: "Follow Successful",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
    });
  }
};

const unFollowUser = async (req, res, next) => {
  try {
    // ye visited user ki id hai
    const { id } = req.params;
    // mene kisi ko follow kia to wo meri following list me aiga aur me uski followers list me jaunga
    // ye simple si logic hai
    User.findByIdAndUpdate(
      { _id: id },
      { $pull: { followers: req.user._id } },
      (err, data) => {
        if (err) {
          return res.status(404).json({
            msg: "User not found",
          });
        }
        User.findByIdAndUpdate(
          { _id: req.user._id },
          { $pull: { following: id } },
          (err, data) => {
            if (err) {
              return res.status(404).json({
                msg: "You Have to log in first",
              });
            }
            return res.status(200).json({
              msg: "Follow Successful",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
    });
  }
};

const editProfile = async (req, res, next) => {
  try {
    const { bio, username, email, image } = req.body;
    await User.findOne({ _id: req.user._id }).then(
      (data) => {
        if (data.profilePhoto && data.imagePublicId) {
          cloudinary.uploader.destroy(data.imagePublicId);
        }

        cloudinary.uploader.upload(
          image,
          { upload_preset: "user-preset" },
          async (err, data) => {
            if (err) {
              return res.status(404).json({
                msg: err.message,
              });
            }

            const targetedUser = await User.findOne({ _id: req.user._id });
            if (!targetedUser) {
              return res.status(404).json({
                msg: "User not Found",
              });
            }
            targetedUser.bio = bio;
            targetedUser.username = username;
            targetedUser.email = email;
            targetedUser.profilePhoto = data.secure_url;
            targetedUser.imagePublicId = data.public_id;
            await targetedUser
              .save()
              .then((result) => {
                return res.status(200).json({
                  msg: "Profile Updated",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      }
    );
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
    });
  }
};

module.exports = {
  getUserData,
  getUserPosts,
  followUser,
  unFollowUser,
  editProfile,
};
