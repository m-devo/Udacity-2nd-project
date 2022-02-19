import supertest from 'supertest';
import { app } from '../../server';
import { Product } from '../../models/products';

const request = supertest(app);

const product: Product = {
  name: 'any',
  price: 100,
  category: 'any'
};

let authToken: string;

describe('TEST PRODUCTS ENDPOINT', () => {
  beforeAll(async () => {
    const response = await request.post('/user').send({
      first_name: 'any',
      last_name: 'any',
      pass: '5451',
    });
    authToken = response.body;
  });

  it('MUST CREATE PRODUCT: POST METHOD \'/product/\' ', async () => {
    const response = await request
      .post('/product')
      .set('authorization', 'Bearer ' + authToken)
      .send(product);
    expect(response.status).toBe(200);
  });

  it('MUST RETURN ALL PRODUCTS: GET METHOD \'/product/all\' ', async () => {
    const response = await request.get('/product/all');
    expect(response.status).toBe(200);
  });

  it('MUST RETURN A PRODUCT: GET METHOD \'/product/:id\' ', async () => {
    const response = await request.get('/product/1');
    expect(response.status).toBe(200);
  });
});
