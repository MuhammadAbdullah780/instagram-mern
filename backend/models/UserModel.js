const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// * USERS SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email must be required and unique"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
  },
  followers: [
    {
      type: ObjectId,
      ref: "Users",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "Users",
    },
  ],
  profilePhoto: String,
  imagePublicId: String,
  Posts: [
    {
      type: ObjectId,
      ref: "Posts",
    },
  ],
});

// *  Export the model
module.exports = mongoose.model("Users", UserSchema);
