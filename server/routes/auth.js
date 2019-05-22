import express from 'express';

import AuthController from '../controllers/AuthController';
import validateAuthActions from '../middlewares/validation/authActions';
import allowFields from '../middlewares/allowFields';

const authRouter = express.Router();

authRouter.post(
  '/',
  allowFields(['emailOrStaffId', 'password']),
  validateAuthActions.validateStaffAuth,
  AuthController.authenticateStaff,
);

export default authRouter;
