const client = require("../config/db");
const asyncHandler = require("../middlewares/async");

//static variable
const ResponseMessages = require("../contract/responseMessages");

exports.getAll = asyncHandler(async (req, res, next) => {
  await client.query(
    `
      SELECT 
        "id"
        ,"title"
      from public.category
      ORDER BY id ASC
    `,
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
        res.status(500).json(ResponseMessages.UNKNOW_ERROR);
      }
    }
  );
});

exports.getById = asyncHandler(async (req, res, next) => {
  if (!Number(req.params.id)) {
    return res.status(400).json(ResponseMessages.EMAIL_REQUIRED);
  }
  await client.query(
    `
      SELECT 
        "id",
        "title"
      from public.category 
      WHERE "id" = $1`,
    [Number(req.params.id)],
    (err, result) => {
      if (!err) {
        if (result) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(500).json("something went wrong");
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

exports.create = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json(ResponseMessages.EMAIL_REQUIRED);
  }
  await client.query(
    `
      INSERT INTO public.category(title)
      VALUES ($1);
      `,
    [title],
    (err, result) => {
      if (!err) {
        if (result) {
          res.status(200).json(result.rows);
        } else {
          res.status(500).json("something went wrong");
        }
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    }
  );
});

exports.update = asyncHandler(async (req, res, next) => {
    const { title } = req.body;
  
  
    if (!title) {
      return next(new ErrorHandler(res, ResponseMessages.FIELD_REQUIRED, 400));
    }
  
    if (!Number(req.params.id)) {
      return next(new ErrorHandler(res, ResponseMessages.INVALID_ID, 400));
    }
    await client.query(
      `UPDATE public.category SET
        title = $2
        WHERE "id" = $1`,
      [Number(req.params.id), title],
      (err, result) => {
        if (!err) {
          if (result) {
              console.log(result);
            res.status(200).json(UpdateStatus.Success);
          } else {
            res.status(500).json('something went wrong');
          }
        } else {
          console.log(err);
          res.status(500).json('something went wrong');
        }
      }
    );
 });
  