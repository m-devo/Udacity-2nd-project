import { Product, ProductStore } from '../../models/products';

const store = new ProductStore();

const product: Product = {
  name: 'any',
  price: 5421,
  category: 'any'
};

describe('TEST CRUD FUCTIONALITY OF PRODUCTS', () => {
  beforeAll(async () => {
    const result = await store.create(product);
    product.id = result.id;
  });

  it('MUST CREATE A NEW PRODUCT', async () => {
    const result = await store.create(product);
    expect(result).toBeTruthy();
  });

  it('MUST GET ALL THE PRODUCTS', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it('MUST SHOW THE SPECIFIED PRODUCT', async () => {
    const result = await store.show(product.id as number);
    expect(result.name).toEqual('any');
  });
});
