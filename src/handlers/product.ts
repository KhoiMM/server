import { Request, Response } from 'express';
import { ProductStore } from '../models/product';

const store = new ProductStore();

export async function getProductList(_req: Request, res: Response) {
    try {
        const productList = await store.index();
        return res.status(200).json(productList);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ errorMessage: error });
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(404).json({ errorMessage: 'productId is a number' });
        }
        const product = await store.show(productId);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(404).json({ errorMessage: 'name and price cannot be empty' });
        }
        if (isNaN(Number(price))) {
            return res.status(404).json({ errorMessage: 'price is a number' });
        }
        const newProduct = await store.create(name, Number(price));
        res.status(201).json(newProduct);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}