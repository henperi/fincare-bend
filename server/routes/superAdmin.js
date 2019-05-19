import express from 'express';
import SuperAdminController from '../controllers/SuperAdminController';
import validationMiddleware from '../middlewares/validationMiddleware';
import checkAuth from '../middlewares/checkAuth';
import checkAccessLevel from '../middlewares/checkAccessLevel';

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

superAdminRouter.post('/staff/create', checkAuth, isSupperAdmin, validateCreateStaff, createStaff);

superAdminRouter.put(
  '/staff/update/:staffId',
  checkAuth,
  isSupperAdmin,
  validateUpdateStaff,
  updateStaff,
);

superAdminRouter.post(
  '/account-type/create',
  checkAuth,
  isSupperAdmin,
  validateCreateAccountType,
  createAccountType,
);

superAdminRouter.put(
  '/account-type/update/:accountTypeId',
  checkAuth,
  isSupperAdmin,
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
  validateUpdateLoanType,
  updateLoanType,
);

export default superAdminRouter;
