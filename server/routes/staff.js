import express from 'express';

import AuthController from '../controllers/AuthController';
import validateAuthActions from '../middlewares/validation/authActions';

const authRouter = express.Router();

authRouter.post('/', validateAuthActions.validateStaffAuth, AuthController.authenticateStaff);

export default authRouter;
