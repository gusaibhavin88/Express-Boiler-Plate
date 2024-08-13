const catchAsyncError = require("../helpers/catchAsyncError");
const { returnMessage } = require("../utils/utils");
const statusCode = require("../messages/statusCodes.json");
const UserService = require("../services/userService");
const { sendResponse } = require("../utils/sendResponse");
const userService = new UserService();

// User Sign Up
exports.signup = catchAsyncError(async (req, res, next) => {
  const user = await userService.signUp(req?.body, req?.file);
  sendResponse(
    res,
    true,
    returnMessage("auth", "registered"),
    user,
    statusCode.success
  );
});
