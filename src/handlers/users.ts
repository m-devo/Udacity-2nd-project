import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/users';
import authentication  from './middlewares/authentication';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch {
    throw new Error('Error.');
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await store.show(id);
    res.json(user);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      pass: req.body.pass,
    };
    const newUser = await store.create(user);
    var token = jwt.sign(
      { id: newUser.id },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/user/all', authentication, index);
  app.get('/user/:id', authentication, show);
  app.post('/user', create);
};

export default userRoutes;
