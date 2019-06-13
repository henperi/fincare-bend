import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import ExpenseController from '../controllers/ExpenseController';
import allowFields from '../middlewares/allowFields';
import expenseMethods from '../middlewares/validation/expenseMethods';

const expensesRouter = express.Router();

/**
 * Get all expenses
 */
expensesRouter.get('/', checkAuth, checkAccessLevel.isAdmin, ExpenseController.fetchAllExpenses);

/**
 * Create an expense
 */
expensesRouter.post(
  '/',
  checkAuth,
  checkAccessLevel.isAdmin,
  allowFields(['expenseTitle', 'amount', 'description', 'category']),
  expenseMethods.validateCreate,
  ExpenseController.create,
);

export default expensesRouter;
