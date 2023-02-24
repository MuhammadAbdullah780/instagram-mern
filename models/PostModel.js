const mongoose = require("mongoose"); // Erase if already required
const { ObjectId } = mongoose.Schema.Types;

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imagePubilcId:{
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: ObjectId,
        ref: "Users",
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "Users",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userPhoto: {
      type: String,
    },
    comments: [
      {
        text: String,
        authorName: {
          type: String,
        },
        postedBy: {
          type: ObjectId,
          ref: "Users",
        },
      },
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Posts", postSchema);
