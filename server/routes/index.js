import express from 'express';
import superAdminRouter from './superAdmin';

const router = express.Router();

router.use('/super-admin', superAdminRouter);

export default router;
