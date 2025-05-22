const { body } = require("express-validator");
const auth_ctrl = require("../controller/auth_ctrl");
const { major, user } = require("../models/index");
const bcrypt = require("bcryptjs");
const { authenticateJWT } = require("../middleware/authMiddleware");

module.exports = (app) => {
  const router = app.Router();
  router.get("/me", authenticateJWT, (req, res) => {
    res.status(200).json({
      message: "token valid",
      data: req.user,
    });
  });
  router.post('/login', [
    body("username")
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 20 })
    .withMessage("Username must be between 6 and 20 characters")
    .withMessage("Username is required")
    .custom(async(value) => {
        let userNameCheck = await user.findOne({
            where: {
                username: value,
            },
        })

        if (!!userNameCheck == false) {
            throw new Error("Username not registered");
        }   
    }),
    body('password').isLength({ min: 6, max: 100 })
    .isString()
    .notEmpty()
  ], auth_ctrl.login)

  router.post(
    "/register",
    [
       body("username")
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 20 })
        .withMessage("Username must be between 6 and 20 characters")
        .withMessage("Username is required")
        .custom(async(value) => {
            let userNameCheck = await user.findOne({
                where: {
                    username: value,
                },
            })

            if (!!userNameCheck) {
                throw new Error("Username already exists");
            }   
        }),
       body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .custom(async(value) => {
            let emailCheck = await user.findOne({
                where: {
                    email: value,
                },
            })

            if (!!emailCheck) {
                throw new Error("email already exists");
            }
        }),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 100 })
        .withMessage("Password must be at least 6 characters long"),
      body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string"),
      body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string"),
      body("classes")
        .notEmpty()
        .withMessage("Class is required")
        .isIn(["X", "XI", "XII"])
        .withMessage("Class must be one of: X, XI, XII"),
      body("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .isIn(["M", "F"])
        .withMessage("Gender must be either M or F"),
      body("major_id")
        .notEmpty()
        .withMessage("Major ID is required")
        .isInt({ min: 1 })
        .withMessage("Major ID must be a positive integer")
        .custom(async (value) => {
          const majorValue = await major.findByPk(value);
          if (!majorValue) {
            throw new Error("Major ID does not exist");
          }
        })
        .withMessage("Major ID does not exist"),
    ],
    auth_ctrl.register
  );

  return router;
};
