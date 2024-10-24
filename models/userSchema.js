const mongoose = require("mongoose");
const { mongo_connection } = require("../config/connection");

const userSchema = new mongoose.Schema({}, { timestamps: true });

const User = mongo_connection.model("user", userSchema);
module.exports = User;
