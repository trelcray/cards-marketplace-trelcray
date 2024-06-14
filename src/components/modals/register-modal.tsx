import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { IRegisterResponse } from "@/@types";
import { fetchWrapper } from "@/api/fetch";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";

const signUpForm = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 dígitos!"),
    email: z.string().email("e-mail inválido!"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas devem ser iguais!",
  });

type SignUpForm = z.infer<typeof signUpForm>;

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isFormValid = () => {
    const values = form.getValues();
    return Object.values(values).every((value) => value.length > 0);
  };

  async function handleSignUp(data: SignUpForm) {
    setIsLoading(true);
    try {
      await fetchWrapper<IRegisterResponse>("/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      toggle();
      form.reset();
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Modal
      title="Cadastrar"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Seu nome</FormLabel>
                <FormControl>
                  <Input id="name" type="input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Seu e-mail</FormLabel>
                <FormControl>
                  <Input id="email" type="input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Sua senha</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirmar sua senha
                </FormLabel>
                <FormControl>
                  <Input id="confirmPassword" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!isFormValid() || isLoading}
            className="w-full"
            type="submit"
          >
            Cadastrar
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
