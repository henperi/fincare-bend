import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import LoanTypeController from '../controllers/LoanTypeController';

const loanTypeRouter = express.Router();

/**
 * Get all loan types
 */
loanTypeRouter.get('/', checkAuth, checkAccessLevel.isStaff, LoanTypeController.fetchAllLoanTypes);

export default loanTypeRouter;
