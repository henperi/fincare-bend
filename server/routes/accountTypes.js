import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import AccountTypeController from '../controllers/AccountTypeController';

const accountTypeRouter = express.Router();

/**
 * Get all account types
 */
accountTypeRouter.get(
  '/',
  checkAuth,
  checkAccessLevel.isStaff,
  AccountTypeController.fetchAllAccountTypes,
);

export default accountTypeRouter;
