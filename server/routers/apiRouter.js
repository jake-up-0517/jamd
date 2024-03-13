import express from 'express';

import userRouter from './userRouter.js';
import friendsRouter from './friendsRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/friends', friendsRouter);

export default router;
