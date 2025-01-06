/* eslint-disable no-console */
import { create } from "zustand";
import { toast } from "sonner";
import { z } from "zod";

import axiosInstance from "@/lib/axios";
import { productSchema } from "@/schemas/productSchema";


export type State = {
    Products: z.infer<typeof productSchema>[];
    Categories: any[];
    isAdding: boolean;
    isUpdating: boolean;
};
export type Actions = {
    addProduct: (product: z.infer<typeof productSchema>[]) => void;
    getProducts: () => void;
    getCategoriesForProduct:()=>void;
    updateProduct: (id: string, product: z.infer<typeof productSchema>) => void;

};

export const useProductsStore = create<State & Actions>()((set, get) => ({
    Products: [],
    Categories: [],
    isAdding: false,
    isUpdating: false,

    getProducts: async () => {
        axiosInstance.get('/products').then((res) => {
            console.log(res.data)
            set({ Products: res.data });
        })
    },
    getCategoriesForProduct: async () => {
        axiosInstance.get('/category').then((res) => {
            console.log(res.data)
            set({ Categories: res.data });
        })
    },
    addProduct: async (data: any) => {
        set({  isAdding: true })

        await axiosInstance.post("/products", data).then(() => {
            toast.success("Product Added Successfully");

        }).catch(() => {
            toast.error("Something went wrong")

        }).finally(() => {
            set({ isAdding: false });

        })
    },
    updateProduct: async (id: string, data: any) => {
        set({ isUpdating: true });

        await axiosInstance.put(`/products/${id}`, data).then(() => {
            toast.success("Product Updated Successfully");
            get().getProducts(); // Refresh the product list
        }).catch(() => {
            toast.error("Something went wrong");
        }).finally(() => {
            set({ isUpdating: false });
        });
    },

}));
