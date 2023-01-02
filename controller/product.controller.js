const client = require("../config/db");
const asyncHandler = require("../middlewares/async");

//static variable
const ResponseMessages = require("../contract/responseMessages");

exports.getAll = asyncHandler(async (req, res, next) => {
  await client.query(
    `
      SELECT 
        "id"
        ,"categoryId"
        ,"name"
        ,image
        ,cost
        ,description
        ,amount
      from public.product
      WHERE "isDeleted" = 0
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

exports.count = asyncHandler(async (req, res, next) => {
  await client.query(
    `
      SELECT 
        "id"
        ,"categoryId"
        ,"name"
        ,image
        ,cost
        ,description
        ,amount
      from public.product
      WHERE "isDeleted" = 0
      ORDER BY id ASC
    `,
    [],
    (err, result) => {
      if (!err) {
        if (result) {
          res.status(200).json(result.rowCount);
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
    return res.status(400).json(ResponseMessages.INVALID_ID);
  }

  await client.query(
    `
      SELECT 
        "id"
        ,"categoryId"
        ,"name"
        ,image
        ,cost
        ,description
        ,amount
       from public.product
        WHERE "id" = $1 AND "isDeleted" = 0`,
    [Number(req.params.id)],
    (err, result) => {
      if (!err) {
        if (result) {
          res.status(200).json(result.rows[0] ? result.rows[0] : []);
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

exports.create = asyncHandler(async (req, res, next) => {
  const { categoryId, name, image, cost, description, amount } = req.body;

  //check REQUIRED fields
  if (!name || !categoryId || !cost || !description || !amount) {
    // return 400 (BAD REQUEST) STATUS
    return res.status(400).json(ResponseMessages.FIELD_REQUIRED);
  }

  //Field must number
  if (!Number(cost) || !Number(amount)) {
    return res.status(400).json(ResponseMessages.INVALID_DATA);
  }

  //execute insert query....
  await client.query(
    `
      INSERT INTO public.product(
        "categoryId",
        "name",
        image,
        cost,
        description,
        amount
      ) VALUES (
          $1,
          $2,
          $6,
          $3,
          $4,
          $5
      ); `,
    [categoryId, name, cost, description, amount, "/public"],
    (err, result) => {
      // return response
      if (!err) {
        res.status(200).json(result.fields);
        console.log(ResponseMessages.POST_PRODUCT_SUCCESS);
      } else {
        res.status(500).json(ResponseMessages.UNKNOW_ERROR);
        console.log(err);
      }
    }
  );
});

exports.update = asyncHandler(async (req, res, next) => {
  const { categoryId, name, image, cost, description, amount } = req.body;

  //check REQUIRED fields
  if (!name || !categoryId || !cost || !description || !amount) {
    // return 400 (BAD REQUEST) STATUS
    return res.status(400).json(ResponseMessages.FIELD_REQUIRED);
  }

  if (!Number(req.params.id)) {
    return res.status(400).json(ResponseMessages.INVALID_ID);
  }

  await client.query(
    `UPDATE public.product SET
       "categoryId" = $2,
       "name" = $3,
       image = $4,
       cost = $5,
       description = $6,
       amount = $7
      WHERE "id" = $1`,
    [
      Number(req.params.id),
      categoryId,
      name,
      "/public",
      cost,
      description,
      amount,
    ],
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

exports.remove = asyncHandler(async (req, res, next) => {
  const { categoryId, name, image, cost, description, amount } = req.body;

  //check REQUIRED fields
  if (!name || !categoryId || !cost || !description || !amount) {
    // return 400 (BAD REQUEST) STATUS
    return res.status(400).json(ResponseMessages.FIELD_REQUIRED);
  }

  if (!Number(req.params.id)) {
    return res.status(400).json(ResponseMessages.INVALID_ID);
  }

  await client.query(
    `UPDATE public.product SET
    "isDeleted" = $2
      WHERE "id" = $1`,
    [Number(req.params.id), 1],
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
