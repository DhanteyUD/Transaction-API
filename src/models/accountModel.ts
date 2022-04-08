import fs from 'fs';

interface Account {
  [key: string]: string | number | Date;
}

let ACCOUNT: Account[];

try {
  ACCOUNT = require('../../database/accounts.json');
} catch (error) {
  ACCOUNT = [];
}

function getAllAccounts(): Promise<Account[]> {
  return new Promise((resolve) => {
    resolve(ACCOUNT);
  });
}

function getSingleAccount(accNum: string): Promise<Account | undefined> {
  let account: Account | undefined;
  return new Promise((resolve) => {
    if (ACCOUNT) {
      account = ACCOUNT.find((account) => account.accountNumber === accNum);
      resolve(account);
    } else {
      resolve(account);
    }
  });
}

function createNewAccount(account: Account): Promise<Account> {
  return new Promise((resolve) => {
    let date = new Date();
    let newAccount: Account;
    if (!ACCOUNT || ACCOUNT.length < 1) {
      newAccount = { ...account, createdAt: date };
      ACCOUNT = [newAccount];
    } else {
      newAccount = { ...account, createdAt: date };
      ACCOUNT.push(newAccount);
    }
    const writeStream = fs.createWriteStream('./database/accounts.json');
    writeStream.write(JSON.stringify(ACCOUNT, null, 4));
    writeStream.end();
    resolve(newAccount);
  });
}

function updateAccount(
  role: string,
  accNum: string,
  amount: number,
): Promise<Account | undefined> {
  return new Promise((resolve) => {
    const index = ACCOUNT.findIndex(
      (account) => account.accountNumber === accNum,
    );
    if (role === 'sender') {
      ACCOUNT[index].balance = +ACCOUNT[index].balance - amount;
    } else {
      ACCOUNT[index].balance = +ACCOUNT[index].balance + amount;
    }

    const writeStream = fs.createWriteStream('./database/accounts.json');
    writeStream.write(JSON.stringify(ACCOUNT, null, 4));
    writeStream.end();
    resolve(ACCOUNT[index]);
  });
}

export { getAllAccounts, getSingleAccount, createNewAccount, updateAccount };
