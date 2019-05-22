import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import StaffController from '../controllers/StaffController';
import validateStaffActions from '../middlewares/validation/staffActions';
import allowFields from '../middlewares/allowFields';

const staffRouter = express.Router();

staffRouter.post(
  '/customer/create',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['email', 'firstName', 'lastName', 'phone']),
  validateStaffActions.validateCreateCustomer,
  StaffController.createCustomer,
);

staffRouter.post(
  '/customer/create-profile/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields([
    'gender',
    'dateOfBirth',
    'placeOfBirth',
    'maritalStatus',
    'nationality',
    'stateOfOrigin',
    'homeTown',
    'profession',
    'LGA',
  ]),
  validateStaffActions.validateCreateCustomerProfile,
  StaffController.createCustomerProfile,
);

staffRouter.post(
  '/customer/create-address/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['city', 'state', 'addressLine1']),
  validateStaffActions.validateCreateCustomerAddress,
  StaffController.createCustomerAddress,
);

staffRouter.post(
  '/customer/create-next-of-kin/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields([
    'title',
    'firstName',
    'lastName',
    'gender',
    'relationship',
    'nationality',
    'stateOfOrigin',
    'LGA',
    'phoneNumber',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
  ]),
  validateStaffActions.validateCreateCustomerNextOfKin,
  StaffController.createCustomerNextOfKin,
);

staffRouter.get(
  '/customer/fetch-all',
  checkAuth,
  checkAccessLevel.isStaff,
  StaffController.fetchAllCustomers,
);

staffRouter.put(
  '/customer/update/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['firstName', 'lastName', 'otherNames', 'phone', 'profileObject', 'addressObject']),
  validateStaffActions.validateUpdateCustomer,
  StaffController.updateCustomer,
);

export default staffRouter;
