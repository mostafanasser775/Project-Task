import express from 'express';
import { addToCart, getCart, removeEntireProductCart, decrementProductCart, createOrder } from '../controllers/carts.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/product/:id', protectRoute, addToCart); // Route to add product to cart
router.get('/', protectRoute, getCart); // Route to get cart items
router.delete('/:id', protectRoute, removeEntireProductCart); // Route to remove entire Product from cart
router.delete('/product/:id', protectRoute, decrementProductCart); // Route to remove and decrement product by 1 from cart
router.post('/order', protectRoute, createOrder); // Route to create order from cart

export default router;