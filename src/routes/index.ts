import express from "express";
import orderRoutes from "./apis/order";
import productRoutes from "./apis/product";
import userRoutes from "./apis/user";

const routes = express.Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/orders', orderRoutes);

export default routes;