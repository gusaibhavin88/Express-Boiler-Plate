const authRoute = require("express").Router();
const authController = require("../controllers/authController");
const validatorFunc = require("../utils/validatorFunction.helper");
const { protect } = require("../middlewares/authUserMiddleware");
const { validateUserRegistration } = require("../validators/auth.validator");
const { upload } = require("../helpers/multer");

authRoute.post(
  "/signup"
  // upload.single("profile_image"),
  // validateUserRegistration,
  // validatorFunc,
  // authController.signup
);
// authRoute.use(protect);

module.exports = authRoute;
