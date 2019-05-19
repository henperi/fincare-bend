import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import StaffController from '../controllers/StaffController';
import validateStaffActions from '../middlewares/validation/staffActions';

const staffRouter = express.Router();

staffRouter.post(
  '/customer/create',
  checkAuth,
  checkAccessLevel.isStaff,
  validateStaffActions.validateCreateCustomer,
  StaffController.createCustomer,
);

staffRouter.post(
  '/customer/create-profile/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  validateStaffActions.validateCreateCustomerProfile,
  StaffController.createCustomerProfile,
);

staffRouter.post(
  '/customer/create-address/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  validateStaffActions.validateCreateCustomerAddress,
  StaffController.createCustomerAddress,
);

staffRouter.post(
  '/customer/create-next-of-kin/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  validateStaffActions.validateCreateCustomerNextOfKin,
  StaffController.createCustomerNextOfKin,
);

export default staffRouter;
