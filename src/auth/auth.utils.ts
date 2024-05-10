import { z } from "zod";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
const  nameRegex = /^(?:\S|_)+$/;
export const restrictedNames: String[] = ["login", "register", "account", "messages"];
export const authInputSchema = z.object({
  username: z
    .string()
    .max(30)
    .refine((name) => nameRegex.test(name))
    .refine((name) => !restrictedNames.includes(name)),
  password: z.string().refine((password) => passwordRegex.test(password), {
    message: "not a strong password",
  }),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
