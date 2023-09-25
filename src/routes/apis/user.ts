import express from 'express';
import { authenticateUser, createUser, getUserList, refreshToken, verifyAccessToken } from '../../handlers/user';

const userRoutes = express.Router();

userRoutes.get('/', verifyAccessToken, getUserList);

userRoutes.post('/authenticate', authenticateUser);

userRoutes.post('/refresh-token', refreshToken);

userRoutes.post('/', createUser);

export default userRoutes;