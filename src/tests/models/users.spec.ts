import { User, UserStore } from '../../models/users';

const store = new UserStore();

const user: User = {
  first_name: 'any',
  last_name: 'any',
  pass: 'pass'
};

describe('TEST CRUD FUNCTIONALUITY OF USER', () => {
  beforeAll(async () => {
    const result = await store.create(user);
    user.id = result.id;
  });
  it('MUST CREATE A NEW USER', async () => {
    const result = await store.create(user);
    expect(result).toBeTruthy();
  });

  it('MUST GET ALL USERS', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it('MUST SHOW THE SPECIFIED USER', async () => {
    const result = await store.show(user.id as number);
    expect(result.first_name).toEqual(user.first_name);
  });
});
