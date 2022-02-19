import bcrypt from 'bcrypt';
import Client from '../database';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  pass: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get all the users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get all the users. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
      const hash = bcrypt.hashSync(user.pass + pepper, saltRounds);
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users(first_name, last_name, pass) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        user['first_name'],
        user['last_name'],
        hash
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create a user. Error: ${err}`);
    }
  }
}
