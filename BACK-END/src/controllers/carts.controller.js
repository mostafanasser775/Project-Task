import prisma from "../prisma.js";

export const addToCart = async (req, res) => {
    const { id } = req.params;
    const customerId = Number(req.customer.id); // Convert customerId to number
    const productId = Number(id); // Convert productId to number
    const quantity = 1; // Set quantity to 1

    try {
        const cartItem = await prisma.cart.upsert({
            where: { customerId_productId: { customerId, productId } },
            update: { quantity: { increment: quantity } },
            create: { customerId, productId, quantity },
            include: { product: true },
        });
        console.log(cartItem);
        return res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const getCart = async (req, res) => {
    const customerId = Number(req.customer.id);

    try {
        const cartItems = await prisma.cart.findMany({
            where: { customerId },
            include: { product: true, },
        });
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};


export const decrementProductCart = async (req, res) => {
    const { id } = req.params;
    const customerId = Number(req.customer.id); // Convert customerId to number
    const productId = Number(id); // Convert productId to number

    try {
        const cartItem = await prisma.cart.update({
            where: { customerId_productId: { customerId, productId } },
            data: { quantity: { decrement: 1 } },
        });

        if (cartItem.quantity <= 0) {
            await prisma.cart.delete({
                where: { customerId_productId: { customerId, productId } },
            });
        }

        return res.status(200).json(cartItem);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

//remove Product with all Quantity using 
export const removeEntireProductCart = async (req, res) => {

    const { id } = req.params;
    const customerId = Number(req.customer.id); // Convert customerId to number
    const productId = Number(id); // Convert productId to number

    try {
        await prisma.cart.delete({
            where: { customerId_productId: { customerId, productId: productId } },
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

export const createOrder = async (req, res) => {
    const customerId = Number(req.customer.id); // Convert customerId to number

    try {
        const cartItems = await prisma.cart.findMany({
            where: { customerId },
            include: { product: true },
        });

        if (cartItems.length === 0) {
            return res.status(400).send("Cart is empty");
        }

        const order = await prisma.order.create({
            data: {
                customerId,
                items: {
                    create: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
        });

        await prisma.cart.deleteMany({
            where: { customerId },
        });

        return res.status(201).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};