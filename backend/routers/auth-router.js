const express = require("express");
const router = express.Router();
const { home, register, login } = require("../controllers/auth-controller");
const { SignUpSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(home);

router.route("/register").post(validate(SignUpSchema), register); // Add validation middleware here

router.route("/login").post(login);

module.exports = router;