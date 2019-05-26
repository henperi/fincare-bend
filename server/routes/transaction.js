import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import allowFields from '../middlewares/allowFields';
import transactionMethods from '../middlewares/validation/transactionMethods';
import TransactionsController from '../controllers/TransactionsController';

const transactionRouter = express.Router();

transactionRouter.post(
  '/create/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['accountNumber', 'transactionType', 'amount', 'referenceNo', 'description']),
  transactionMethods.validateCreateTransaction,
  TransactionsController.createTransaction,
);

export default transactionRouter;
