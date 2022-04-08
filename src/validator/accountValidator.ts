import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import StatusCode from 'http-status-codes';

const accountSchema = joi.object({
  balance: joi.number().required(),
});

export const accountValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  accountSchema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((error) => {
      res.status(StatusCode.BAD_REQUEST).end(error.message);
    });
};
