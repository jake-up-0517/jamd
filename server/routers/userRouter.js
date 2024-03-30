import express from 'express';

import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signin', userController.signIn, (req, res) => {
  res.status(200).json(res.locals.name);
});

userRouter.post('/signup', userController.signUp, (req, res) => {
  res.status(200).json(res.locals.name);
});

userRouter.post(
  '/updatelocation',
  userController.updateLocation,
  (req, res) => {
    res.status(200).json('Location updated!');
  }
);

userRouter.post('/getusers', userController.getUsers, (req, res) => {
  res.status(200).json(res.locals.users);
});

export default userRouter;
