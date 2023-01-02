const client = require("../config/db");
const asyncHandler = require("../middlewares/async");

//static variable
const ResponseMessages = require("../contract/responseMessages");

exports.getAll = asyncHandler(async (req, res, next) => {
  await client.query(
    `SELECT "id","genderId",
      email,
      "name",
      "phoneNumber",
      "roleId",
      TO_CHAR("lastLogin"::DATE, 'dd-mm-yyyy HH:MI:SS') as "lastLogin",
      "statusId"
      from public."user" 
      ORDER BY id ASC`,
    [],
    (err, result) => {
      if (!err) {
        if (result) {
          res.status(200).json(result.rows);
        } else {
          res.status(500).json(ResponseMessages.UNKNOW_ERROR);
        }
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    }
  );
});

exports.getById = asyncHandler(async (req, res, next) => {
  if (!Number(req.params.id)) {
    return res.status(400).json(ResponseMessages.INVALID_USER_ID);
  }


  await client.query(
    `SELECT "genderId",
      email,
      "name",
      "phoneNumber",
      "roleId",
      TO_CHAR("lastLogin"::DATE, 'dd-mm-yyyy HH:MI:SS') as "lastLogin",
      "statusId"
      from public."user" 
      WHERE "id" = $1`,
    [Number(req.params.id)],
    (err, result) => {
      if (!err) {
        if (result) {
          res.status(200).json(result.rows[0] ? result.rows[0] : []);
        } else {
          res.status(500).json(ResponseMessages.UNKNOW_ERROR);
        }
      } else {
        console.log(err)
        res.status(500).json(ResponseMessages.UNKNOW_ERROR);
      }
    }
  );
});
