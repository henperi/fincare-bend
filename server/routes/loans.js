import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import allowFields from '../middlewares/allowFields';
import loanMethods from '../middlewares/validation/loanMethods';
import LoanController from '../controllers/LoanController';

const loanRouter = express.Router();

loanRouter.post(
  '/create/:customerId/:accountNumber',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['amount', 'loanRefNo', 'loanTypeName', 'purpose', 'gaurantorsArray']),
  loanMethods.validateCreateLoan,
  LoanController.createLoan,
);

export default loanRouter;
