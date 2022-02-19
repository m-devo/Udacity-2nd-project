import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import  authentication  from './middlewares/authentication';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await store.show(id);
    res.json(result);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      order_status: req.body.status,
      products: req.body.products,
    };
    const result = await store.create(order);
    res.json(result);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/order/all', authentication, index);
  app.get('/order/:id', authentication, show);
  app.post('/order', authentication, create);
};

export default orderRoutes;
