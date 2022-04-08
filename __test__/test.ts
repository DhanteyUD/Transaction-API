import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import StatusCode from 'http-status-codes';

let Account: {
  [key: string]: string | number;
}[];

try {
  Account = require('../database/accounts.json');
} catch (error) {
  Account = [];
}

describe('GET request', () => {
  test('Gets all balance and return status 200', async () => {
    const res = await request(app).get('/balance');
    expect(res.statusCode).toEqual(StatusCode.OK);
  });

  test('Gets an account by account number and returns status 200', async () => {
    const accNum = '0150783383';
    const res = await request(app).get(`/balance/${accNum}`);
    expect(res.statusCode).toEqual(StatusCode.OK);
  });

  test('Return status code of 400 for invalid account number', async () => {
    const accNum = '0150783380';
    const res = await request(app).get(`/balance/${accNum}`);
    expect(res.statusCode).toEqual(StatusCode.BAD_REQUEST);
  });

  test('Gets an account by account number and returns status 200', async () => {
    const accNum = '0150783383';
    const res = await request(app).get(`/balance/${accNum}`);
    expect(res.statusCode).toEqual(StatusCode.OK);
  });

  test('Gets all transactions and returns status 200', async () => {
    const res = await request(app).get('/transactions');
    expect(res.statusCode).toEqual(StatusCode.OK);
  });
});

describe('POST request', () => {
  const accountNum = '0150783383';
  const validate = Account.some((acc) => acc.accountNumber === `${accountNum}`);
  if (!validate) {
    test('Creates an account successfully and return status 201', async () => {
      const accDetails = { amount: 5000, accountNumber: '0150783383' };
      const res = await request(app).post('/create-account').send(accDetails);
      expect(res.statusCode).toEqual(StatusCode.CREATED);
    });
  } else {
    test('Returns 404 for existing account number', async () => {
      const accDetails = { amount: 5000, accountNumber: '0150783383' };
      const res = await request(app).post('/create-account').send(accDetails);
      expect(res.statusCode).toEqual(StatusCode.BAD_REQUEST);
    });
  }

  test('Creates a transaction successfully and return status 201', async () => {
    const transactionDetails = {
      senderAccount: '0181823275',
      receiverAccount: '0150783383',
      amount: 10,
    };
    const res = await request(app).post('/transfer').send(transactionDetails);
    expect(res.statusCode).toEqual(StatusCode.CREATED);
  });

  test('Returns 404, for sender account number not valid', async () => {
    const transactionDetails = {
      senderAccount: '0181823270',
      receiverAccount: '0150783380',
      amount: 10,
    };
    const res = await request(app).post('/transfer').send(transactionDetails);
    expect(res.statusCode).toEqual(StatusCode.NOT_FOUND);
  });

  test('Returns 404, for receiver account number not valid', async () => {
    const transactionDetails = {
      senderAccount: '0181823270',
      receiverAccount: '0150783380',
      amount: 10,
    };
    const res = await request(app).post('/transfer').send(transactionDetails);
    expect(res.statusCode).toEqual(StatusCode.NOT_FOUND);
  });

  test('Returns 404, for insufficient funds', async () => {
    const transactionDetails = {
      from: '0181823270',
      to: '0150783380',
      amount: 2000000,
    };
    const res = await request(app).post('/transfer').send(transactionDetails);
    expect(res.statusCode).toEqual(StatusCode.BAD_REQUEST);
  });
});
