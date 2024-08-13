const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const logger = require("../logger");
const { throwError } = require("../helpers/errorUtil");
const {
  returnMessage,
  validateEmail,
  passwordValidation,
  verifyUser,
} = require("../utils/utils");
const statusCode = require("../messages/statusCodes.json");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../helpers/sendEmail");
const Admin = require("../models/adminSchema");

class UserService {
  tokenGenerator = (payload) => {
    try {
      const expiresIn = payload?.remember_me
        ? process.env.JWT_REMEMBER_EXPIRE
        : process.env.JWT_EXPIRES_IN;
      const token = jwt.sign(
        { id: payload._id },
        process.env.JWT_User_SECRET_KEY,
        {
          expiresIn,
        }
      );
      return { token, user: payload };
    } catch (error) {
      logger.error(`Error while token generate, ${error}`);
      throwError(error?.message, error?.statusCode);
    }
  };

  // User Sign up
  signUp = async (payload, image) => {
    try {
      const { email, password, contact_number, first_name, last_name } =
        payload;

      if (!validateEmail(email)) {
        return throwError(returnMessage("auth", "invalidEmail"));
      }

      if (!passwordValidation(password)) {
        return throwError(returnMessage("auth", "invalidPassword"));
      }

      const user = await User.findOne({ email: email });
      if (user) {
        return throwError(returnMessage("auth", "emailExist"));
      }

      const hash_password = await bcrypt.hash(password, 14);

      const verification_token = crypto.randomBytes(32).toString("hex");

      let imagePath = "";
      if (image) {
        imagePath = "uploads/" + image.filename;
      }

      let newUser = await User.create({
        email,
        password: hash_password,
        first_name,
        last_name,
        contact_number,
        verification_token: verification_token,
        ...(imagePath && { profile_image: imagePath }),
      });
      newUser.save();

      const encode = encodeURIComponent(payload?.email);
      const link = `${process.env.REACT_APP_URL}/verify/?token=${verification_token}&email=${encode}`;
      const user_verify_template = verifyUser(
        link,
        payload?.first_name + " " + payload?.last_name
      );
      sendEmail({
        email: email,
        subject: returnMessage("emailTemplate", "verifyUser"),
        message: user_verify_template,
      });

      return;
    } catch (error) {
      logger.error(`Error while user signup: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };
}

module.exports = UserService;
