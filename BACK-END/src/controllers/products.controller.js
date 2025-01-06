import jwt, { decode } from "jsonwebtoken";
import prisma from "../prisma.js";

import cloudinary from "../lib/cloudinary.js";


export const getProducts = async (req, res) => {
    const { page = 1, limit = 18 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const products = await prisma.product.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            include: {
                supplier: {
                    select: {
                        address: true,
                        type: true
                    }
                },
                category: true // Include category information
            }
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

export const addProduct = async (req, res) => {
    const { name, price, discount, description, image, category } = req.body;

    try {
   

        const uploadResponse = await cloudinary.uploader.upload(image);
        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                discount,
                description,
                image: uploadResponse.secure_url || " ",
                rating: 1,
                categoryId: Number(category),
                supplierId: 1
            }
        });
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}




export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                supplier: {
                    select: {
                        address: true,
                        type: true
                    }
                }
            }
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};



export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(500).send("Internal Server Error");
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log()

    console.log('adad')
    const { name, price, discount, description, image, category, supplierId, rating, location } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(image);

    try {
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                price,
                discount,
                description,
                image: uploadResponse.secure_url || " ",
                rating: 1,
                categoryId: Number(category),
                supplierId,
                rating,
                location
            }
        });

        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(500).send("Internal Server Error");
    }
};