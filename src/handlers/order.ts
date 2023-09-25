import { Request, Response } from 'express';
import { OrderDetailStore, OrderStore } from '../models/order';

const orderStore = new OrderStore();
const orderDetailStore = new OrderDetailStore();

export async function getOrderList(_req: Request, res: Response) {
    try {
        const orderList = await orderStore.index();
        return res.status(200).json(orderList);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}

export async function getOrdersByUserId(req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId);
        if (isNaN(userId)) {
            return res.status(404).json({ errorMessage: 'userId is a number' });
        }
        const orderList = await orderStore.getByUserId(userId);
        return res.status(200).json(orderList);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}

export async function getOrderById(req: Request, res: Response) {
    try {
        const orderId = Number(req.params.id);
        if (isNaN(orderId)) {
            return res.status(404).json({ errorMessage: 'orderId is a number' });
        }
        const order = await orderStore.show(orderId);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}

export async function createOrder(req: Request, res: Response) {
    try {
        const status = req.body.status;
        const userId = Number(req.body.userId);
        if (isNaN(userId)) {
            return res.status(404).json({ errorMessage: 'userId is a number' });
        }
        const newOrder = await orderStore.create(status, userId);
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}

export async function getOrderDetailsByOrderId(req: Request, res: Response) {
    try {
        const orderId = Number(req.params.id);
        if (isNaN(orderId)) {
            return res.status(404).json({ errorMessage: 'orderId is a number' });
        }
        const orderDetailList = await orderDetailStore.getOrderDetailsByOrderId(orderId);
        return res.status(200).json(orderDetailList);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}

export async function createOrderDetail(req: Request, res: Response) {
    try {
        const orderId = Number(req.params.id);
        const productId = Number(req.body.productId);
        const quantity = Number(req.body.quantity);
        if (isNaN(orderId) || isNaN(productId) || isNaN(quantity)) {
            return res.status(404).json({ errorMessage: 'orderId, productId and quantity are numbers' });
        }
        if (quantity < 1) {
            return res.status(404).json({ errorMessage: 'quantity must be positive' });
        }
        const newOrderDetail = await orderDetailStore.create(orderId, productId, quantity);
        return res.status(201).json(newOrderDetail);
    } catch (error) {
        return res.status(404).json({ errorMessage: error });
    }
}