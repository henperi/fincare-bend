import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import allowFields from '../middlewares/allowFields';
import loanMethods from '../middlewares/validation/loanMethods';
import LoanController from '../controllers/LoanController';

const loanRouter = express.Router();

/**
 * Request a loan
 */
loanRouter.post(
  '/create/:customerId/:accountNumber',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields([
    'requestAmount',
    'loanRefNo',
    'loanTypeName',
    'purpose',
    'gaurantorsArray',
    'duration',
  ]),
  loanMethods.validateCreateLoan,
  LoanController.createLoan,
);

/**
 * Approve a loan
 */
loanRouter.post(
  '/approve/:customerId/:loanRefNo',
  checkAuth,
  checkAccessLevel.isAdmin,
  allowFields(['approvedAmount']),
  loanMethods.validateApproveLoan,
  LoanController.approveLoan,
);

/**
 * Reject a loan
 */
loanRouter.post(
  '/reject/:customerId/:loanRefNo',
  checkAuth,
  checkAccessLevel.isAdmin,
  LoanController.rejectLoan,
);

/**
 * fetch all loans
 */
loanRouter.get('/', checkAuth, checkAccessLevel.isStaff, LoanController.fetchAllLoans);

/**
 * fetch a loan by its Id
 */
loanRouter.get('/:loanId', checkAuth, checkAccessLevel.isStaff, LoanController.fetchLoanById);

export default loanRouter;
