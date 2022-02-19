import { Order, OrderStore } from '../../models/orders';
import { Product, ProductStore } from '../../models/products';
import { User, UserStore } from '../../models/users';

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

const product: Product = {
  name: 'any',
  price: 567,
  category: 'any'
};

const user: User = {
  first_name: 'any',
  last_name: 'any',
  pass: 'pass'
};

let order: Order;

describe('TEST CRUD FUNCTIONALITY OF ORDERS', () => {
  beforeAll(async () => {
    const productResult = await productStore.create(product);
    product.id = productResult.id;
    const userResult = await userStore.create(user);
    user.id = userResult.id;

    order = {
      user_id: user.id as number,
      order_status: 'active',
      products: [{ product_id: product.id as number, quantity: 2 }]
    };
  });

  it('MUST CREATE A NEW ORDER', async () => {
    const orderResult = await orderStore.create(order);
    expect(orderResult).toBeDefined();
  });

  it('MUST GET ALL THE ORDERS', async () => {
    const result = await orderStore.index();
    expect(result).toBeTruthy();
  });

    it('MUST SHOW THE SPECIFIED ORDER', async () => {
    const orderResult = await orderStore.show(user.id as number);
    expect(orderResult).toBeDefined();
  });
});
