/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { register } from "@/app/api/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Invalid Name" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function RegisterationForm() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    setIsloading(true);
    try {
      const Rdata = await register({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      toast.success("Registration successfull");
      if (Rdata) {
        setIsloading(false);
        router.replace("/login");
      }
    } catch (err) {
      toast.error(
        (err as unknown as any)?.response?.data?.message || "An Error Occured"
      );
      setIsloading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="h-fit py-2 text-lg"
                  type="text"
                  {...field}
                />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="h-fit py-2 text-lg"
                  type="email"
                  {...field}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  className="h-fit py-2 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="!mt-6" loading={isLoading}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
