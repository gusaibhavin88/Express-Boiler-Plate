const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const validatorFunc = require("../utils/validatorFunction.helper");
const { protect } = require("../middlewares/authUserMiddleware");
const { validateUserRegistration } = require("../validators/user.validator");
const { checkProfileSize, upload } = require("../helpers/multer");

userRoute.post(
  "/signup",
  checkProfileSize,
  upload.single("profile_image"),
  validateUserRegistration,
  validatorFunc,
  userController.signup
);
userRoute.use(protect);

module.exports = userRoute;
