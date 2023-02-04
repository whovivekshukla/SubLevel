const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Like", LikeSchema);
