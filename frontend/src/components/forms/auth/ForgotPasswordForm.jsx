import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, loginSchema } from "./schema";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import authService from "@/services/authService";
import { useNavigate } from "react-router";

export default function ForgotPasswordForm({ className, ...props }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      
      setError("");
      const result = await authService.requestPasswordReset(data.email);

      if (!result.success) {
        setError(result.error);
      }else{
        toast.success("Password reset link has been sent to your email.");
        navigate(`/admin/auth/forgot-password?token=${result?.data?.data.token}`);
        form.reset();
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-start gap-2 text-start">
              <h1 className="text-xl font-bold">Forgot Password</h1>
              <FieldDescription className="">
                Enter your email to reset your password.
              </FieldDescription>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </Field>
              )}
            />

            <Field>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner /> Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Field>

            <div className="ml-auto">
              <a
                href="/admin/auth/login"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Back to Login
              </a>
            </div>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
}
