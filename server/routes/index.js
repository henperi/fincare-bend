import express from 'express';
import authRouter from './staff';
import superAdminRouter from './superAdmin';

const router = express.Router();

router.use('/super-admin', superAdminRouter);
router.use('/auth', authRouter);

export default router;
