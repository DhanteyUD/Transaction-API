import { Request, Response } from 'express';
import StatusCode from 'http-status-codes';
import {
  createTransact,
  getAllTransactions,
  getSingleTransaction,
} from '../models/transactionModel';
import { updateAccount, getSingleAccount } from '../models/accountModel';

async function getPageNotFound(req: Request, res: Response): Promise<void> {
  try {
    res.status(StatusCode.BAD_REQUEST).end('Page not found :-(');
  } catch (error) {
    console.error(error);
  }
}

async function createTransaction(req: Request, res: Response): Promise<void> {
  try {
    const { senderAccount, amount, receiverAccount, description } = req.body;
    const sender = await getSingleAccount(senderAccount);
    const receiver = await getSingleAccount(receiverAccount);
    if (sender && receiver) {
      if (sender.balance >= amount) {
        const transactionDetails = {
          senderAccount,
          amount,
          receiverAccount,
          description,
        };
        await updateAccount('sender', senderAccount, amount);
        await updateAccount('receiver', receiverAccount, amount);
        const newTransaction = await createTransact(transactionDetails);
        res.status(StatusCode.CREATED).send(newTransaction);
      } else {
        res
          .status(StatusCode.BAD_REQUEST)
          .send({ error: 'Insufficient funds in account' });
      }
    } else if (!sender) {
      res
        .status(StatusCode.NOT_FOUND)
        .send({ error: 'Sender account not in database' });
    } else if (!receiver) {
      res
        .status(StatusCode.NOT_FOUND)
        .send({ error: 'Receiver account not in database' });
    } else {
      res
        .status(StatusCode.NOT_FOUND)
        .send({ error: 'Please enter a valid account number' });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTransactions(req: Request, res: Response): Promise<void> {
  try {
    const transactions = await getAllTransactions();
    if (transactions === undefined) {
      res.status(StatusCode.NOT_FOUND).send('No transactions made yet');
    } else {
      res.status(StatusCode.OK).send(transactions);
      console.log(`${transactions.length} transaction(s) made in total...`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTransaction(req: Request, res: Response): Promise<void> {
  try {
    const transactions = await getAllTransactions();
    if (transactions === undefined) {
      res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'No transactions made yet' });
    } else {
      const reference = req.params.reference;
      const transaction = await getSingleTransaction(reference);
      if (!transaction) {
        res
          .status(StatusCode.NOT_FOUND)
          .send({ message: 'Transaction not found' });
      } else {
        res.status(StatusCode.OK).send(transaction);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export { getPageNotFound, createTransaction, getTransactions, getTransaction };
