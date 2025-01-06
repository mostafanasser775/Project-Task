import express from 'express';
import { CheckAuth, login, logout, signup,verify_otp } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router=  express.Router();

router.post('/customer/signup',signup)
router.post('/customer/login',login)

router.post('/customer/verify-otp',verify_otp)


router.get('/logout',logout)

router.get('/check',protectRoute,CheckAuth)

export default router;