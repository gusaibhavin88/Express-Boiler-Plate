const catchAsyncErrors = require("../helpers/catchAsyncError");
const jwt = require("jsonwebtoken");
const { throwError } = require("../helpers/errorUtil");
const { returnMessage } = require("../utils/utils");
const User = require("../models/userSchema");

exports.protect = catchAsyncErrors(async (req, res, next) => {});
