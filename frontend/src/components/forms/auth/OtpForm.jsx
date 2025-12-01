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
import { otpSchema } from "./schema";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { images } from "@/constants/images";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import authService from "@/services/authService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useNavigate } from "react-router";

export default function OtpForm({ className, ...props }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setError("");
      const result = await authService.validateOTP({ token: props.token, otp: data.otp });
      if (!result.success) {
        setError(result.error);
      } else {
        toast.success("OTP verified successfully!");
        navigate("/admin/auth/reset-password?token=" + props.token);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="">Enter One-Time Password (OTP)</CardTitle>
          <CardDescription className="">
            Please enter the 6-digit OTP sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <Field>
                      {/* <FieldLabel htmlFor="otp">One-Time Password</FieldLabel> */}
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            {...field}
                            pattern={REGEXP_ONLY_DIGITS}
                            className="gap-2"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={0}
                                className="w-12 h-12 text-lg"
                              />
                              <InputOTPSlot
                                index={1}
                                className="w-12 h-12 text-lg"
                              />
                              <InputOTPSlot
                                index={2}
                                className="w-12 h-12 text-lg"
                              />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={3}
                                className="w-10 h-10 text-lg"
                              />
                              <InputOTPSlot
                                index={4}
                                className="w-10 h-10 text-lg"
                              />
                              <InputOTPSlot
                                index={5}
                                className="w-10 h-10 text-lg"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <div className="ml-auto flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <div>Remaining time; <span className=" text-primary font-bold">00:45</span></div>
                        <div>
                          Didn't receive the code?{" "}
                          <a className={"text-primary font-bold"}>Resend</a>
                        </div>
                      </div>
                    </Field>
                  )}
                />

                <Field>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Spinner /> Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => navigate("/admin/auth/login")}
                  >
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
