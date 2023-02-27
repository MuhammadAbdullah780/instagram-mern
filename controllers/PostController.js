const { StatusCodes } = require("http-status-codes");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const cloudinaryConfig = require("../utils/cloudinary");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res, next) => {
  try {
    const { caption, image } = req.body;

    // * IF FIELDS ARE INCOMPLETE
    if (!image || !caption) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "Please provide the image and the caption",
      });
    }
    // * CREATING  THE  POST
    const targetUser = await User.findOne({ _id: req.user._id });

    cloudinary.uploader.upload(
      image,
      { upload_preset: "post-preset" },
      async (err, result) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Error Occurs while uploading the image",
          });
        }

        const myPost = new Post({
          image: result.secure_url,
          imagePubilcId: result.public_id,
          caption,
          username: targetUser.username,
          postedBy: req.user,
          userPhoto: req.user.profilePhoto ? req.user.profilePhoto : "",
        });
        targetUser.Posts.push(myPost);
        await targetUser.save();
        await myPost.save();

        res.status(201).json({
          msg: "Post Created Successfully",
          Post: myPost,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort("-createdAt")
    if (!posts) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "Currently we don't have any Post.",
      });
    }

    res.status(200).send(posts);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

const getSpecificPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "Failed While Accessing the Post.",
      });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const options = req.body;
    const { id } = req.params.id;
    if (!req.body) {
      return res.status(400).send({
        msg: "Please Enter the Updated Field",
      });
    }

    const myPost = await Post.findOne({ _id: req.params.id });
    await cloudinary.uploader.destroy(myPost.imagePubilcId, (err, result) => {
      if (err) {
        res.status(404).json({
          msg: err.message,
        });
      }
      cloudinary.uploader.upload(
        options.image,
        { upload_preset: "post-preset" },
        async (err, data) => {
          if (err) {
            res.status(404).json({
              msg: "Error Occurred While saving the new pic",
            });
          }
          myPost.image = data.secure_url;
          myPost.imagePubilcId = data.public_id;
          myPost.caption = options.caption;
          await myPost.save();

          res.status(200).json({
            msg: "Post Updated Successfully",
            doc: myPost,
          });
        }
      );
    });
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

const addLikeOnPost = async (req, res, next) => {
  try {
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { likes: req.user._id } },
      function (error, success) {
        if (!error) {
          return res.status(200).json({
            msg: "Successfully like the Post",
          });
        }
        console.log(success);
        res.status(404).json({
          msg: error.message,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const addCommentOnPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        msg: "Please write something in the textField to add comment",
      });
    }
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            text,
            authorName: req.user.username,
            postedBy: req.user._id,
          },
        },
      },
      function (error, success) {
        if (!error) {
          return res.status(200).json({
            msg: "Successfully Commented on the Post",
          });
        }
        res.status(404).json({
          msg: error.message,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const removeLikeOnPost = async (req, res, next) => {
  try {
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: req.user._id } },
      function (error, success) {
        if (!error) {
          return res.status(200).json({
            msg: "Successfully unLiked the Post",
          });
        }
        res.status(404).json({
          msg: error.message,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const removeCommentOnPost = (req, res, next) => {
  try {
    const { id } = req.body;
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          comments: { _id: id },
        },
      },
      function (error, success) {
        if (!error) {
          return res.status(200).json({
            msg: "Successfully Deleted Comment on the Post",
          });
        }
        res.status(404).json({
          msg: error.message,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    await Post.findById(req.params.id).then((data) => {
      cloudinary.uploader.destroy(data.imagePubilcId, async (err, data) => {
        if (err) {
          return res.status(404).json({
            msg: err.message,
          });
        }
        await Post.deleteOne({ _id: req.params.id })
          .then((result) => {
            if (result.deletedCount <= 0) {
              return res.status(404).json({
                msg: "Post Not found",
              });
            } else {
              User.findByIdAndUpdate(
                { _id: req.user._id },
                { $pull: { Posts: req.params.id } }
              ).then(() => {
                return res.status(200).json({
                  msg: "Post Deleted Successfully",
                });
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

    // res.status(200).send(posts)
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getSpecificPost,
  addCommentOnPost,
  removeCommentOnPost,
  addLikeOnPost,
  removeLikeOnPost,
};
