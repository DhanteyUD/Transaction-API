import { Request, Response } from 'express';
import StatusCode from 'http-status-codes';
import {
  getAllAccounts,
  getSingleAccount,
  createNewAccount,
} from '../models/accountModel';

function generateAccount() {
  let accNum = '01';
  while (accNum.length < 10) {
    accNum += Math.floor(Math.random() * 10);
  }
  return accNum;
}

async function getAccounts(req: Request, res: Response): Promise<void> {
  try {
    const accounts = await getAllAccounts();
    if (accounts === undefined || accounts.length === 0) {
      res.status(StatusCode.NOT_FOUND).send('No account in Database');
    } else {
      res.status(StatusCode.OK).send(accounts);
    }
  } catch (error) {
    console.log('Error getting account details :-(');
  }
}

async function getAccount(req: Request, res: Response): Promise<void> {
  try {
    const accounts = await getAllAccounts();
    if (accounts === undefined) {
      res.status(StatusCode.NOT_FOUND).send('No account available');
    } else {
      const accNum = req.params.accountNumber;
      const account = await getSingleAccount(accNum);
      if (!account) {
        res
          .status(StatusCode.BAD_REQUEST)
          .send({ message: `Account with account number ${accNum} not found` });
      } else {
        res.status(StatusCode.OK).send(account);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function createAccount(req: Request, res: Response): Promise<void> {
  try {
    const accounts = await getAllAccounts();
    const { balance } = req.body;
    let accountNum = generateAccount();

    const validate = accounts.some(
      (account) => account.accountNumber === accountNum,
    );
    if (validate) {
      res
        .status(StatusCode.CONFLICT)
        .send({ error: 'Account number already exits' });
    } else {
      const accountDetails = {
        accountNumber: accountNum,
        balance: balance,
      };
      const newAccount = await createNewAccount(accountDetails);
      res.status(StatusCode.CREATED).send(newAccount);
    }
  } catch (error) {
    console.log('Error creating account');
  }
}

export { getAccounts, getAccount, createAccount };
