import prisma from "../prisma.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: { name },
        });
        return res.status(201).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        });
        return res.status(200).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: { id: Number(id) },
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

