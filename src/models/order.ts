import client from "../database";

export type Order = {
    id: Number;
    status: Boolean;
    userId: Number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders';
            const results = await client.query(sql);
            connection.release();
            return results.rows;
        } catch (error) {
            throw new Error(`Cannot get orders: ${error}`);
        }
    }

    async show(orderId: Number): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'SELECT * FROM orders WHERE id=$1',
                values: [orderId]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows[0];
        } catch (error) {
            throw new Error(`Cannot get order: ${error}`);
        }
    }

    async getByUserId(userId: Number): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'SELECT * FROM orders WHERE user_id =$1',
                values: [userId]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows;
        } catch (error) {
            throw new Error(`Cannot get orders: ${error}`);
        }
    }

    async create(status: Boolean, userId: Number): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *',
                values: [status, userId]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows[0];
        } catch (error) {
            throw new Error(`Cannot create order: ${error}`);
        }
    }
}

export type OrderDetail = {
    id: Number;
    quantity: Boolean;
    userId: Number;
    productId: Number;
}

export class OrderDetailStore {
    async getOrderDetailsByOrderId(orderId: Number): Promise<OrderDetail[]> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'SELECT * FROM order_details WHERE order_id =$1',
                values: [orderId]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows;
        } catch (error) {
            throw new Error(`Cannot get order details: ${error}`);
        }
    }

    async create(orderId: Number, productId: Number, quantity: Number): Promise<OrderDetail> {
        try {
            const connection = await client.connect();
            const sql = {
                text: 'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                values: [orderId, productId, quantity]
            };
            const results = await client.query(sql);
            connection.release();
            return results.rows[0];
        } catch (error) {
            throw new Error(`Cannot create order detail: ${error}`);
        }
    }
}