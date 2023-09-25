import client from "../database";

export type Product = {
    id: Number;
    name: string;
    price: Number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products';
            const results = await client.query(sql);
            connection.release();
            return results.rows;
        } catch (error) {
            throw new Error(`Cannot get product: ${error}`);
        }
    }

    async show(productId: Number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'SELECT * FROM products WHERE id=$1',
                values: [productId]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows[0];
        } catch (error) {
            throw new Error(`Cannot get product: ${error}`);
        }
    }

    async create(productName: string, price: Number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
                values: [productName, price]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows[0];
        } catch (error) {
            throw new Error(`Cannot create product: ${error}`);
        }
    }
}