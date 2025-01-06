import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
dotenv.config();

// Importing the routes
import authRoutes from './routes/auth.route.js';
import ProductsRoutes from './routes/products.route.js';
import CartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';
import categoryRoutes from './routes/category.route.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


const port = 5001;

app.use('/api/auth', authRoutes);
app.use('/api/products', ProductsRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/orders', orderRoutes); // Use order routes
app.use('/api/category', categoryRoutes); // Use order routes
app.use('/api/supplier', async (req, res) => {
  try {
    const { type, name, email, phone, password, address, city, image } = req.body;
    const newSupplier = await prisma.supplier.create({
      data: {
        type,
        name,
        email,
        phone,
        password,
        address,
        city,
        image,
      },
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create supplier' });
  }
}); // Use supplier routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // connectDB();
});