const asyncHandler = require("../middlewares/async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Logger = require("../utils/logger");
const client = require("../config/db");

//static variable
const StatusUser = require("../contract/statusUser");
const RoleUser = require("../contract/roleUser");
const ResponseMessages = require("../contract/responseMessages");

exports.signup = asyncHandler(async (req, res, next) => {
  const { email, phoneNumber, password, name, genderId } = req.body;

  //check REQUIRED fields
  if (!name || !email || !genderId || !password) {
    // return 400 (BAD REQUEST) STATUS
    return res.status(400).json(ResponseMessages.FIELD_REQUIRED);
  }
  //hashing password with salt
  const hashPass = await encryptPass(password);

  //execute insert query....
  await client.query(
    `
    INSERT INTO public.user(
        email,
        "statusId",
        "roleId",
        "phoneNumber",
        "password",
        "name",
        "lastLogin",
        "genderId"
        ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        NOW(),
        $7
    ); `,
    [
      email,
      StatusUser.ACTIVE,
      RoleUser.USER,
      phoneNumber,
      hashPass,
      name,
      genderId,
    ],
    (err, result) => {
      // return response
      if (!err) {
        res.status(201).json(ResponseMessages.SIGNUP_SUCCESS);
        console.log(ResponseMessages.SIGNUP_SUCCESS);
      } else {
        res.status(201).json(ResponseMessages.SIGNUP_FAILURE);
        console.log(err);
      }  
    }
  );
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password: enterPassword } = req.body;

  //check REQUIRED fields

  if (!email) {
    // return 400 (BAD REQUEST) STATUS

    return res.status(400).json(ResponseMessages.EMAIL_REQUIRED);
  }

  if (!enterPassword) {
    // return 400 (BAD REQUEST) STATUS

    return res.status(400).json(ResponseMessages.PASSWORD_REQUIRED);
  }

  // find a user with this email
  await client.query(
    `SELECT id , password FROM public.user WHERE "email" = $1`,
    [email],
    (err, result) => {
      if (!err) {
        const { id, password } = result.rows[0];
        // compare    enterPassword with password

        bcryptPass(enterPassword, password).then((result) => {
          if (result) {
            genToken(id).then((token) => { 
              res.status(200).json({
                token: token,
                loginStatus: ResponseMessages.LOGIN_SUCCESS,
              });
            });
          } else {
            res.status(200).json(ResponseMessages.USERNAME_OR_PASSWORD_WRONG);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
});

bcryptPass = async (enterdPass, password) => {
  const result = await bcrypt.compare(enterdPass, password);
  return result;
};

encryptPass = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const newPass = await bcrypt.hash(password, salt);
  return newPass;
};

genToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
