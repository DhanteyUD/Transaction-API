import express from 'express';
import {
  getAccounts,
  getAccount,
  createAccount,
} from '../controllers/accountController';
import {
  getPageNotFound,
  createTransaction,
  getTransactions,
  getTransaction,
} from '../controllers/transactionController';
import { accountValidator } from '../validator/accountValidator';
import { transactionValidator } from '../validator/transactionValidator';

const router = express.Router();

router.get('/balance', getAccounts);
router.get('/balance/:accountNumber', getAccount);
router.post('/create-account', accountValidator, createAccount);
router.post('/transfer', transactionValidator, createTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:reference', getTransaction);
router.get('/*', getPageNotFound);

export default router;
