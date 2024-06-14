"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { ILoginResponse } from "@/@types";
import { fetchWrapper } from "@/api/fetch";
import { useLoginModal } from "@/hooks/use-login-modal";
import { setCookies } from "@/utils/set-cookies";

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

const signInForm = z.object({
  email: z.string().email("e-mail inválido!"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos!"),
});

type SignInForm = z.infer<typeof signInForm>;

export const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isFormValid = () => {
    const values = form.getValues();
    return Object.values(values).every((value) => value.length > 0);
  };

  async function handleSignIn(data: SignInForm) {
    setIsLoading(true);
    try {
      const res = await fetchWrapper<ILoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      setCookies(res);
      form.reset();
      loginModal.onClose();
    } catch (error) {
      toast.error("Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Modal
      title="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
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

          <Button
            disabled={!isFormValid() || isLoading}
            className="w-full"
            type="submit"
          >
            Acessar
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
