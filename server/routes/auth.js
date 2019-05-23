import express from 'express';

import AuthController from '../controllers/AuthController';
import validateAuthActions from '../middlewares/validation/authActions';
import allowFields from '../middlewares/allowFields';
import checkAuth from '../middlewares/checkAuth';
import checkAccessLevel from '../middlewares/checkAccessLevel';

const authRouter = express.Router();

authRouter.post(
  '/',
  allowFields(['emailOrStaffId', 'password']),
  validateAuthActions.validateStaffAuth,
  AuthController.authenticateStaff,
);

authRouter.put(
  '/update-password',
  checkAuth,
  checkAccessLevel.isStaff,
  allowFields(['oldPassword', 'newPassword', 'newPasswordRepeat']),
  validateAuthActions.validateUpdatePassword,
  AuthController.updatePassword,
);

export default authRouter;
