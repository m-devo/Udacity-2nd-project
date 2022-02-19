import supertest from 'supertest';
import { User } from '../../models/users';
import { app } from '../../server';

const request = supertest(app);
let authToken: string;

const user:User = {
  first_name: 'any',
  last_name: 'any',
  pass: '5412'
};

describe('TEST USERS ENDPOINT', () => {
  beforeAll(async () => {
    const response = await request.post('/user').send({
      first_name: 'any',
      last_name: 'any',
      pass: '4654',
    });
    authToken = response.body;
  });

  it('MUST CREATE A USER: POST METHOD \'/user/\' ', async () => {
    const response = await request
      .post('/user')
      .set('authorization', 'Bearer ' + authToken)
      .send(user);
    expect(response.status).toBe(200);
  });

  it('MUST RETURN ALL USERS: GET METHOD "/user/all"', async () => {
    const response = await request
      .get('/user/all')
      .set('authorization', 'Bearer ' + authToken);
    expect(response.status).toBe(200);
  });

  it('MUST SHOW USER: GET METHOD "/user/:id" ', async () => {
    const response = await request
      .get('/user/1')
      .set('authorization', 'Bearer ' + authToken);
    expect(response.status).toBe(200);
  });

});
