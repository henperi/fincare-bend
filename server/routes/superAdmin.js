import express from 'express';
import SuperAdminController from '../controllers/SuperAdminController';
import validationMiddleware from '../middlewares/validationMiddleware';
import checkAuth from '../middlewares/checkAuth';
import checkAccessLevel from '../middlewares/checkAccessLevel';

const superAdminRouter = express.Router();
const { createStaff } = SuperAdminController;
const { validateCreateStaff } = validationMiddleware;
const { isSupperAdmin } = checkAccessLevel;

superAdminRouter.post('/staff/create', checkAuth, isSupperAdmin, validateCreateStaff, createStaff);

export default superAdminRouter;
