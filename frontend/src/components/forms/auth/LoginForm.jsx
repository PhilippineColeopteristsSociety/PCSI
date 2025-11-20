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
import { loginSchema } from "./schema";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { images } from "@/constants/images";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm({ className, ...props }) {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      const result = await login(data);
      if (!result.success) {
   
        setLoginError(result.error);
      }

      // If successful, AuthContext will handle the redirect
    } catch (error) {
  
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-start gap-2 text-start">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <FieldDescription className="">
                Enter your email and password to login.
              </FieldDescription>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {loginError}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FormControl>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </Field>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        {...field}
                        className="pr-10"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm p-1"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        tabIndex={0}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
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
                {form.formState.isSubmitting ?  (
                      <>
                        <Spinner /> Logging in...
                      </>
                    ) : "Login"}
              </Button>
            </Field>

            <div className="ml-auto">
              <a
                href="/admin/auth/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
}
