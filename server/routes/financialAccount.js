import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import allowFields from '../middlewares/allowFields';
import FinAccountController from '../controllers/finAccountController';
import finAccountMethods from '../middlewares/validation/finMethods';

const finAccountRouter = express.Router();

finAccountRouter.post(
  '/create/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['actType', 'contributionAmount', 'contributionFrequency']),
  finAccountMethods.validateAddFinAccount,
  FinAccountController.addFinAccount,
);

export default finAccountRouter;
