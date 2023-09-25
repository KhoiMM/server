import express from 'express';
import { createProduct, getProductById, getProductList } from '../../handlers/product';
import { verifyAccessToken } from '../../handlers/user';

const productRoutes = express.Router();

productRoutes.get('/', getProductList);

productRoutes.get('/:id', getProductById);

productRoutes.post('/', verifyAccessToken, createProduct);

export default productRoutes;