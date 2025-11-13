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
import { resetPasswordSchema } from "./schema";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { CircleCheck, Eye, EyeOff } from "lucide-react";
import { images } from "@/constants/images";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ResetPasswordForm({ className, ...props }) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    level: 0,
    label: "",
  });
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) {
      return { score: 0, level: 0, label: "" };
    }

    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special characters

    // Determine level (1-4 bars) and label based on score
    let level = 0;
    let label = "";
    
    if (score <= 2) {
      level = 1;
      label = "Weak";
    } else if (score <= 3) {
      level = 2;
      label = "Fair";
    } else if (score <= 4) {
      level = 3;
      label = "Good";
    } else {
      level = 4;
      label = "Strong";
    }

    return { score, level, label };
  };

  // Watch password field for changes
  const passwordValue = form.watch("password");

  useEffect(() => {
    if (passwordValue) {
      const strength = calculatePasswordStrength(passwordValue);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, level: 0, label: "" });
    }
  }, [passwordValue]);

  // Countdown and redirect effect
  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      navigate("/admin/auth/login");
    }
  }, [isSuccess, countdown, navigate]);

  const onSubmit = async (data) => {
    try {
      setError("");

      const result = await authService.resetPassword(
        props.token,
        data.password
      );

      if (!result.success) {
        setError(result.error);
      } else {
        toast.success("Password has been reset successfully.");
        setIsSuccess(true);
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
              <h1 className="text-xl font-bold">Reset Password</h1>
              <FieldDescription className="">
                Set your new password.
              </FieldDescription>
            </div>
            {/* {true && (
              <div className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                <span>
                  Redirecting to login page in {countdown} second
                  {countdown !== 1 ? "s" : ""}...
                </span>
                
              </div>
            )} */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}{" "}
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
                  {passwordValue && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Password strength:</span>
                        <span className={`font-medium ${
                          passwordStrength.level === 1 ? "text-red-600" :
                          passwordStrength.level === 2 ? "text-orange-600" :
                          passwordStrength.level === 3 ? "text-yellow-600" :
                          "text-green-600"
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((bar) => (
                          <div
                            key={bar}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              bar <= passwordStrength.level
                                ? passwordStrength.level === 1
                                  ? "bg-red-500"
                                  : passwordStrength.level === 2
                                  ? "bg-orange-500"
                                  : passwordStrength.level === 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use 8+ characters with a mix of letters, numbers & symbols
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </Field>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder=""
                        {...field}
                        className="pr-10"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm p-1"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        tabIndex={0}
                      >
                        {showConfirmPassword ? (
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
                disabled={form.formState.isSubmitting || isSuccess}
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
              <Button variant={"outline"} type="button" onClick={() => navigate("/admin/auth/login")}>
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
      <AlertDialog open={isSuccess} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle >Password Updated!</AlertDialogTitle>
            <AlertDialogDescription>
               Redirecting to login page in {countdown} second
                  {countdown !== 1 ? "s" : ""}...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={()=> navigate("/admin/auth/login")} >Redirect Now</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
