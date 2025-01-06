import prisma from "../prisma.js";

export const getOrders = async (req, res) => {
    const id= req.customer.id;
    const customerId = Number(id); // Convert customerId to number

    try {
        const orders = await prisma.order.findMany({
            where: { customerId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
