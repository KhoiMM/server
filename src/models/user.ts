import client from "../database";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

export type User = {
    id?: Number;
    firstname: string;
    lastname: string;
    username: string;
    password?: string;
}

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM users';
            const results = await client.query(sql);
            connection.release();
            return results.rows;
        } catch (error) {
            throw new Error(`Cannot get users: ${error}`);
        }
    }

    async create(user: User): Promise<User> {
        const { firstname, lastname, username, password } = user;
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, username, password';
            let user;
            if (saltRounds) {
                const hash = bcrypt.hashSync(
                    password + pepper,
                    parseInt(saltRounds)
                );

                const result = await conn.query(sql, [firstname, lastname, username, hash]);
                user = result.rows[0];
            }
            conn.release();
            return user;
        } catch (error) {
            throw new Error(`unable create user (${username}): ${error}`);
        }
    }

    async delete(userId: Number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=$1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`unable delete user (${userId}): ${error}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id, firstname, lastname, username, password FROM users WHERE username=$1';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];

                if (bcrypt.compareSync(password + pepper, user.password)) {
                    delete user.password;
                    return user;
                }
            }
        } catch (error) {
            throw new Error(`unable authenticate user (${username}): ${error}`);
        }
        return null;
    }
}