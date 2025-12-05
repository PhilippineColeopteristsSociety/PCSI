import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import authService from "@/services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "./schema";
import { set } from "zod";

export default function OTPForm({ open, onOpenChange, setAllowEditEmail, ...props }) {
  const [error, setError] = useState("");
  const [currentToken, setCurrentToken] = useState(props.token);
  const [countdown, setCountdown] = useState(60); // 1 minute in seconds
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Update currentToken when props.token changes
  useEffect(() => {
    if (props.token) {
      setCurrentToken(props.token);
      setCountdown(60); // Reset countdown when new token is received
      setCanResend(false); // Reset canResend when new token is received
    }
  }, [props.token]);

  // Reset states when modal opens
  useEffect(() => {
    if (open) {
      setCountdown(60);
      setCanResend(false);
      setError("");
      form.reset();
    }
  }, [open, form]);

  // Countdown timer
  useEffect(() => {
    if (!open) return;
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  // Format countdown time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      setError("");
      
      const result = await authService.resendOTP(currentToken, 'change-email');
      
      if (!result.success) {
        setError(result.error);
        toast.error(result.error);
      } else {
        // Update token if new token is returned
        if (result.data?.data?.token) {
          setCurrentToken(result.data.data.token);
        }
        
        // Reset countdown
        setCountdown(60);
        setCanResend(false);
        
        // Clear OTP input
        form.reset();
        
        toast.success("OTP has been resent to your email");
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setError("");
      const result = await authService.validateOTP({
        token: currentToken,
        otp: data.otp,
      });
      if (!result.success) {
        setError(result.error);
      } else {
        toast.success("OTP verified successfully!");
        setAllowEditEmail(true);
        onOpenChange(false);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-md"} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className={"text-start"}>
            Enter One-Time Password (OTP)
          </DialogTitle>
          <DialogDescription className={"text-start"}>
            Please enter the 6-digit OTP sent to your email.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
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
                        <div>
                          Remaining time:{" "}
                          <span className={`font-bold ${countdown === 0 ? 'text-red-500' : 'text-primary'}`}>
                            {formatTime(countdown)}
                          </span>
                        </div>
                        <div>
                          Didn't receive the code?{" "}
                          <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={!canResend || isResending}
                            className={
                              canResend && !isResending
                                ? "text-primary font-bold hover:underline cursor-pointer"
                                : "text-muted-foreground font-bold cursor-not-allowed"
                            }
                          >
                            {isResending ? "Sending..." : "Resend"}
                          </button>
                        </div>
                      </div>
                    </Field>
                  )}
                />

                <Field orientation="horizontal">
                  <Button
                    className={"flex-1"}
                    type="button"
                    variant={"outline"}
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={"flex-1"}
                    type="submit"
                    disabled={form.formState.isSubmitting}
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
              </FieldGroup>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
