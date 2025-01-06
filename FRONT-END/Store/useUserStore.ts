/* eslint-disable no-console */
import { create } from "zustand";
import { toast } from "sonner";
import { z } from "zod";
import { redirect, useRouter } from 'next/navigation';

import axiosInstance from "@/lib/axios";
import { userSchema } from "@/schemas/userSchema";
import { user } from "@nextui-org/theme";

export type State = {
  phone: string;
  user: z.infer<typeof userSchema> | null | undefined;
  IsSignUp: boolean;
  IsSuccess: boolean;
  IsLogin: boolean;
  isVerify: boolean;
};
export type Actions = {
  addUser: (Pivot: z.infer<typeof userSchema>[]) => void;
  loginUser: (data: string) => void
  verifyOtp: (otp: string) => void
  logout: () => void
  checkAuth: (Redirect: boolean) => void
};

export const useUserStore = create<State & Actions>()((set, get) => ({
  phone: '',
  user: undefined,
  IsSignUp: false,
  IsSuccess: false,
  IsLogin: false,
  isVerify: false,
  addUser: async (data: any) => {
    set({ IsSignUp: true, IsSuccess: false })

    await axiosInstance.post("/auth/customer/signup", data).then(() => {
      toast.success("Register Successfully");
      set({ IsSuccess: true });
    }).catch(() => {
      toast.error("Something went wrong")
    }).finally(() => {
      set({ IsSignUp: false });
      if (get().IsSuccess) {
        set({ phone: data?.phone as string })
        redirect('/otp-verify')
      }
    })
  },
  loginUser: async (phone: string) => {
    console.log(phone)
    set({ IsSignUp: true, IsSuccess: false })

    await axiosInstance.post("/auth/customer/login", { phone }).then(() => {
      set({ IsSuccess: true });
    }).catch(() => {
      toast.error("Something went wrong")
    }).finally(() => {
      set({ IsSignUp: false });
      if (get().IsSuccess) {
        set({ phone: phone })
        redirect('/otp-verify')
      }
    })
  },
  checkAuth: async (Redirect) => {
    await axiosInstance.get("/auth/check").then((res) => {
      console.log(res.data);

      set({ user: res.data })
      console.log('asdasd')

    }).catch(err => {
      set({ user: null })
    }).finally(() => {
      if (user !== null && user !== undefined && Redirect)
        redirect('/')

    });
  },
  verifyOtp: async (otp: string) => {
    console.log(otp)
    set({ IsSignUp: true, IsSuccess: false })

    await axiosInstance.post("/auth/customer/verify-otp", { otp }).then((res) => {
      get().checkAuth(true);

      toast.success(res.data.message)

      set({ IsSuccess: true });
    }).catch((error) => {
      toast.error(error.response.data.message)
    }).finally(() => {
      set({ IsSignUp: false });
      if (get().IsSuccess) {
        get().checkAuth(true);
      }
    })
  },
  logout: async () => {
    await axiosInstance.get("/auth/logout").then(() => {
      set({ user: null });
    }).catch(() => {
      toast.error("Error while logging out")
    }).finally(() => {
      if (user == null || user === undefined) {
        redirect('/')
      }
    })
  },
}));