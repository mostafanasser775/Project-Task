import express from 'express';
import { getOrders } from '../controllers/orders.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', protectRoute, getOrders); // Route to get orders

export default router;
