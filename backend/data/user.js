const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: String,
    password: String,
    logged_in: Boolean,
  },
  {timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);
