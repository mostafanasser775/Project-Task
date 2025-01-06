import prisma from "../prisma.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        console.log(req)
        console.log("jwt token", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        console.log(decoded);
        const customer = await prisma.customer.findUnique({
            where: { id: decoded.customerId }
        });
        console.log(customer);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        req.customer = customer;
        next();
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: "Internal Server error" });
    }
};