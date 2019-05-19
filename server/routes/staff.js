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
  '/customer/createProfile/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  validateStaffActions.validateCreateCustomerProfile,
  StaffController.createCustomerProfile,
);

staffRouter.post(
  '/customer/createAddress/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  validateStaffActions.validateCreateCustomerAddress,
  StaffController.createCustomerAddress,
);

export default staffRouter;
