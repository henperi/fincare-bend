import express from 'express';
import authRouter from './auth';
import staffRouter from './staff';
import superAdminRouter from './superAdmin';
import finAccountRouter from './financialAccount';
import transactionRouter from './transaction';
import loanRouter from './loans';
import customerRouter from './customers';

const router = express.Router();

router.use('/super-admin', superAdminRouter);
router.use('/auth', authRouter);
router.use('/staff', staffRouter);
router.use('/fin-account', finAccountRouter);
router.use('/transaction', transactionRouter);
router.use('/loan', loanRouter);
router.use('/customer', customerRouter);

export default router;
