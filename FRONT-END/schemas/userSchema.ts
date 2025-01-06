import validator from "validator";
import { z } from "zod";

export const userSchema = z.object({
    _id: z.string().optional(),
    name: z.string().nonempty().min(4,{message:"Full Name is required"}),
    phone: z.string().min(1,{message:'Required'}).refine(validator.isMobilePhone),
  });