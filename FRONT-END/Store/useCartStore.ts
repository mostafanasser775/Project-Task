/* eslint-disable no-console */
import { create } from "zustand";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";


export type State = {
    Cart: any[];
    Total: number;
    Pending: boolean;
    IsScuccess: boolean;
};
export type Actions = {
    AddProductToCart: (ProductId: string) => void;
    DecrementProductCart: (ProductId: string) => void;
    getCart: () => void;
    GetTotalPrice: () => void;
    CreateOrder: () => void;
};

export const useCartStore = create<State & Actions>()((set, get) => ({
    Cart: [],
    Total: 0,
    Pending: false,
    IsScuccess: false,

    getCart: async () => {
        axiosInstance.get('/cart').then(async (res) => {

            await set({ Cart: res.data })
            get().GetTotalPrice();
            console.log("Cart", res.data)
        })
    },
    GetTotalPrice: () => {
        var totalprice = 0

        get().Cart.forEach((item: any) => {
            totalprice += (item.product.price - (item.product.price * (item.product.discount / 100))) * item.quantity

        });

        set(() => ({ Total: totalprice }))

    },
    DecrementProductCart: async (ProductId: any) => {
        set({ Pending: true })
        await axiosInstance.delete(`/cart/product/${ProductId}`).then((res) => {
            const newProduct = res.data;

            set((state) => {
                const existingProduct = state.Cart.find((item) => item.id === newProduct.id);

                if (existingProduct) {
                    if (existingProduct.quantity > 1) {
                        // Decrement the quantity by 1 of the existing product
                        return {
                            Cart: state.Cart.map((item) =>
                                item.id === newProduct.id ? { ...item, quantity: item.quantity - 1 } : item
                            ),
                        };
                    } else {
                        // Remove the product from the cart if quantity is 1
                        return {
                            Cart: state.Cart.filter((item) => item.id !== newProduct.id)
                        };
                    }
                }

                return state;
            });
            toast.success("Product quantity decremented");
            get().GetTotalPrice();
            //get().getCart();
        }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            set({ Pending: false });
        })
    },
    AddProductToCart: async (ProductId: any) => {
        set({ Pending: true })
        await axiosInstance.post(`/cart/product/${ProductId}`).then((res) => {
            const newProduct = res.data;

            set((state) => {
                const existingProduct = state.Cart.find((item) => item.id === newProduct.id);

                if (existingProduct) {
                    return {
                        Cart: state.Cart.map((item) =>
                            item.id === newProduct.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                } else {
                    // Add the new product to the cart
                    return {
                        Cart: [...state.Cart, { ...newProduct, quantity: 1 }],
                    };
                }
            });
            toast.success("Product Added to Cart");
            get().GetTotalPrice();
            //get().getCart();
        }).catch(() => {
            toast.error("Something went wrong")

        }).finally(() => {
            set({ Pending: false });
        })
    },
    CreateOrder: async () => {
        axiosInstance.post('/cart/order').then(async (res) => {
            await set({ Cart: [],Total:0 })
            toast.success("Order Placed Successfully");
            // get().GetTotalPrice();
            // console.log("Cart", res.data)
        })
    }
}));
