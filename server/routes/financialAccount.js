import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import allowFields from '../middlewares/allowFields';
import FinAccountController from '../controllers/finAccountController';
import finAccountMethods from '../middlewares/validation/finMethods';

const finAccountRouter = express.Router();

/**
 * Create a finAccount
 */
finAccountRouter.post(
  '/create/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['actType', 'contributionAmount', 'contributionFrequency']),
  finAccountMethods.validateAddFinAccount,
  FinAccountController.addFinAccount,
);

/**
 * Get all finAccounts
 */
finAccountRouter.get(
  '/',
  checkAuth,
  checkAccessLevel.isStaff,
  FinAccountController.fetchAllFinAccounts,
);

/**
 * Get a finAccount by the accountNumber
 */
finAccountRouter.get(
  '/:accountNumber',
  checkAuth,
  checkAccessLevel.isStaff,
  FinAccountController.fetchByAccountNumber,
);

export default finAccountRouter;
