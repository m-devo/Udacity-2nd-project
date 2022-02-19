import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);
let authToken: string;

describe('TEST ORDERS ENDPOINT', () => {
  beforeAll(async () => {
    const userResult = await request.post('/user').send({
      first_name: 'any',
      last_name: 'any',
      pass: '985',
    });
    authToken = userResult.body;
    await request
      .post('/product')
      .set('authorization', 'Bearer ' + authToken)
      .send({
        name: 'any',
        price: 5454,
        category: 'any',
      });
  });

  it('MUST CREATE ORDER. POST METHOD /order/', async () => {
    const response = await request
      .post('/order')
      .set('authorization', 'Bearer ' + authToken)
      .send({
        user_id: 1,
        order_status: 'status',
        products: [{ product_id: 1, quantity: 2 }],
      });
    expect(response.status).toBe(200);
  });

  it('MUST RETURN All ORDERS.  order/all', async () => {
    const response = await request
      .get('/order/all')
      .set('authorization', 'Bearer ' + authToken);
    expect(response.status).toBe(200);
  });

  it('MUST RETURN AN ORDER OF :id 1 . order/:id', async () => {
    const response = await request
      .get('/order/1')
      .set('authorization', 'Bearer ' + authToken);
    expect(response.status).toBe(200);
  });

});
