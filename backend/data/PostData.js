const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    id: Number,
    userName: String,
    post: String,
    read: Boolean,
    time: Date,
  },
  {timestamps:true}
);

module.exports = mongoose.model("PostData", PostSchema);
