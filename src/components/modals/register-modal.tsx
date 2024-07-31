import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { IRegisterResponse } from "@/@types";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { fetchWrapper } from "@/lib/fetch";
import { signUpSchema } from "@/lib/schemas";

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

type SignUpSchema = z.infer<typeof signUpSchema>;

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
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

  const handleSignUp: SubmitHandler<SignUpSchema> = async (data) => {
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
  };
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
