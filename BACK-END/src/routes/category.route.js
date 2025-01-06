import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', getCategories); // Route to get categories
router.post('/', protectRoute, createCategory); // Route to create a category
router.put('/:id', protectRoute, updateCategory); // Route to update a category
router.delete('/:id', protectRoute, deleteCategory); // Route to delete a category

export default router;