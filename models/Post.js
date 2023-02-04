const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
