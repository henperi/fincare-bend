import express from 'express';

import checkAccessLevel from '../middlewares/checkAccessLevel';
import checkAuth from '../middlewares/checkAuth';
import CustomerController from '../controllers/CustomerController';

const customerRouter = express.Router();

/**
 * Get all customers
 */
customerRouter.get('/', checkAuth, checkAccessLevel.isStaff, CustomerController.fetchAllCustomers);

/**
 * Get a customer by the id
 */
customerRouter.get(
  '/:customerId',
  checkAuth,
  checkAccessLevel.isStaff,
  CustomerController.fetchById,
);

export default customerRouter;
