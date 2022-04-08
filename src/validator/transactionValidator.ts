import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import StatusCode from 'http-status-codes';

const transactionSchema = joi.object({
  senderAccount: joi
    .custom((accNum) => {
      if (typeof accNum === 'string' && accNum.match(/^\d+$/)) return accNum;
      throw new Error('account number should consist of only numbers');
    })
    .required(),
  amount: joi.number().required(),
  receiverAccount: joi
    .custom((accNum) => {
      if (typeof accNum === 'string' && accNum.match(/^\d+$/)) return accNum;
      throw new Error('account number should consist of only numbers');
    })
    .required(),
  description: joi.string(),
});

export const transactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  transactionSchema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((error) => {
      res.status(StatusCode.BAD_REQUEST).end(error.message);
    });
};
