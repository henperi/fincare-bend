import express from 'express';
import SuperAdminController from '../controllers/SuperAdminController';
import validationMiddleware from '../middlewares/validationMiddleware';
import checkAuth from '../middlewares/checkAuth';
import checkAccessLevel from '../middlewares/checkAccessLevel';
import allowFields from '../middlewares/allowFields';

const superAdminRouter = express.Router();
const {
  createStaff,
  updateStaff,
  createAccountType,
  updateAccountType,
  createLoanType,
  updateLoanType,
} = SuperAdminController;

const {
  validateCreateStaff,
  validateCreateAccountType,
  validateUpdateAccountType,
  validateCreateLoanType,
  validateUpdateLoanType,
  validateUpdateStaff,
} = validationMiddleware;

const { isSupperAdmin } = checkAccessLevel;

superAdminRouter.post(
  '/staff/create',
  checkAuth,
  isSupperAdmin,
  allowFields([
    'email',
    'phone',
    'password',
    'firstName',
    'lastName',
    'staffLevel',
    'passwordConfirmation',
  ]),
  validateCreateStaff,
  createStaff,
);

superAdminRouter.put(
  '/staff/update/:staffId',
  checkAuth,
  isSupperAdmin,
  allowFields(['email', 'phone', 'fullName', 'staffLevel']),
  validateUpdateStaff,
  updateStaff,
);

superAdminRouter.post(
  '/account-type/create',
  checkAuth,
  isSupperAdmin,
  allowFields(['accountName', 'interestRate', 'minimumBalance']),
  validateCreateAccountType,
  createAccountType,
);

superAdminRouter.put(
  '/account-type/update/:accountTypeId',
  checkAuth,
  isSupperAdmin,
  allowFields(['accountName', 'interestRate', 'minimumBalance']),
  validateUpdateAccountType,
  updateAccountType,
);

/**
 * Create Loan Type
 */
superAdminRouter.post(
  '/loan-type/create',
  checkAuth,
  isSupperAdmin,
  allowFields(['loanName', 'interestRate', 'maximumAmount', 'payCycle']),
  validateCreateLoanType,
  createLoanType,
);

/**
 * Update Loan Type
 */
superAdminRouter.put(
  '/loan-type/update/:loanTypeId',
  checkAuth,
  isSupperAdmin,
  allowFields(['loanName', 'interestRate', 'maximumAmount', 'payCycle']),
  validateUpdateLoanType,
  updateLoanType,
);

export default superAdminRouter;
