import express from 'express';

import { getProducts, addProduct, getProduct, deleteProduct, updateProduct } from '../controllers/products.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', getProducts)
router.get('/:id', getProduct)

router.post('/', protectRoute, addProduct)
router.put('/:id', updateProduct); // Add this line
router.delete('/:id', deleteProduct); // Add this line

export default router;