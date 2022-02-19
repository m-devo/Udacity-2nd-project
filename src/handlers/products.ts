import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import  authentication  from './middlewares/authentication';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await store.show(id);
    res.json(product);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch {
    res.status(400);
    res.json('Error.');
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/product/all', index);
  app.get('/product/:id', show);
  app.post('/product', authentication, create);
};

export default productRoutes;
