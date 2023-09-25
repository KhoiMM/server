import express from 'express';
import { createOrder, createOrderDetail, getOrderById, getOrderDetailsByOrderId, getOrderList, getOrdersByUserId } from '../../handlers/order';
import { verifyAccessToken } from '../../handlers/user';

const orderRoutes = express.Router();

orderRoutes.get('/', verifyAccessToken, getOrderList);

orderRoutes.get('/:id', verifyAccessToken, getOrderById);

orderRoutes.post('/', verifyAccessToken, createOrder);

orderRoutes.get('/user/:userId', verifyAccessToken, getOrdersByUserId);

orderRoutes.get('/:id/orderdetails', verifyAccessToken, getOrderDetailsByOrderId);

orderRoutes.post('/:id/product', verifyAccessToken, createOrderDetail);

export default orderRoutes;