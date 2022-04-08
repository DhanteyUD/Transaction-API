import fs from 'fs';
import { v4 as uuid } from 'uuid';

interface Transaction {
  [key: string]: string | number | Date;
}

let TRANSACTION: Transaction[];

try {
  TRANSACTION = require('../../database/transactions.json');
} catch (error) {
  TRANSACTION = [];
}

function createTransact(transaction: Transaction): Promise<Transaction> {
  return new Promise((resolve) => {
    const date = new Date();
    const id = uuid();
    const newTransaction = {
      reference: id,
      ...transaction,
      createdAt: date,
    };
    if (!TRANSACTION || TRANSACTION.length < 1) {
      TRANSACTION = [newTransaction];
    } else {
      TRANSACTION.push(newTransaction);
    }
    const writeStream = fs.createWriteStream('./database/transactions.json');
    writeStream.write(JSON.stringify(TRANSACTION, null, 4));
    writeStream.end();
    resolve(newTransaction);
  });
}

function getAllTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => {
    resolve(TRANSACTION);
  });
}

function getSingleTransaction(
  reference: string,
): Promise<Transaction | undefined> {
  let transaction: Transaction | undefined;
  return new Promise((resolve) => {
    if (TRANSACTION) {
      transaction = TRANSACTION.find(
        (transaction) => transaction.reference === reference,
      );
      resolve(transaction);
    } else {
      resolve(transaction);
    }
  });
}

export { createTransact, getAllTransactions, getSingleTransaction };
