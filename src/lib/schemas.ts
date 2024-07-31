import { z } from "zod";

export const cardSchema = z.object({
  selectedOfferingCards: z
    .array(z.string())
    .min(1, "Você deve selecionar pelo menos um card."),
  selectedReceivingCards: z
    .array(z.string())
    .min(1, "Você deve selecionar pelo menos um card."),
});

export const signInSchema = z.object({
  email: z.string().email("e-mail inválido!").trim(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos!").trim(),
});

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 dígitos!").trim(),
    email: z.string().email("e-mail inválido!").trim(),
    password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos!").trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas devem ser iguais!",
  });
