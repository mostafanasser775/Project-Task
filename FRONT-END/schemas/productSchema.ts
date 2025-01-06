import { z } from "zod";

export const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(4, { message: 'Product Name is Required' }).default(''),
    price: z.number().default(0),
    discount: z.number().default(0),
    description: z.string().min(1, { message: "Required" }),
    image: z.union([z.string(), z.instanceof(ArrayBuffer)]).optional(),
    category: z.any(),
    supplierId: z.number().default(1).optional(),
    rating: z.number().default(1),
    supplier: z.object({
        address: z.string().optional(),
        type: z.string().optional(),
    }).optional()
});
