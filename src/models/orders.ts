import Client from '../database';

export type orderProduct = {
  product_id: number;
  quantity: number;
};

export type Order = {
  id?: number;
  user_id: number;
  order_status: string;
  products: orderProduct[];
};

export type UserOrder = {
  product_name: string;
  quantity: number;
  order_status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get all the orders. ${err}`);
    }
  }

  async show(user_id: number): Promise<UserOrder[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT p.name AS product_name, op.quantity, o.order_status 
      FROM orders o JOIN order_products op ON o.id = op.order_id 
      JOIN products p ON p.id = op.product_id WHERE o.user_id = ${user_id}`;
      const result = await conn.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get an order Error: ${err}`);
    }
  }

  async create(order: Order) {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders(user_id, order_status) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.user_id, order.order_status]);
      const order_id = result.rows[0].id;
      let orderSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES';
      for (let i = 0; i < order.products.length; i++) {
        const product = order.products[i];
        orderSql += `(${order_id}, ${product.product_id}, ${product.quantity})`;
        if (i != order.products.length - 1) orderSql += ',';
        else orderSql += 'RETURNING *';
      }
      const orderResult = await conn.query(orderSql);
      return orderResult.rows;
    } catch (err) {
      throw new Error(`Cannot create an order ${err}`);
    }
  }
}
