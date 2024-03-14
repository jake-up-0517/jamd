import express from 'express';

import userRouter from './userRouter.js';
import friendsRouter from './friendsRouter.js';
import messagesRouter from './messagesRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/friends', friendsRouter);
router.use('/messages', messagesRouter);

export default router;
