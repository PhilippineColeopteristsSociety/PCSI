import { Controller } from "react-hook-form";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Edit, ShieldQuestionMark } from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import authService from "@/services/authService";
import OTPForm from "./OTPForm";

export default function UserForm({
  userData,
  form,
  submitting,
  loading,
  onSubmit,
}) {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpToken, setOtpToken] = useState(null);
  const [error, setError] = useState("");
  const [allowEditEmail, setAllowEditEmail] = useState(false);

  const sendOTP = async () => {
    setSendingOTP(true);
    // Implement OTP sending logic here
    try {
      const sendOTP = await authService.sendChangeEmailOTP(userData.email);
      if (sendOTP.success) {
        toast.success("Verification code sent to your email");
        setShowVerifyModal(false);
        setShowOTPModal(true);
        setOtpToken(sendOTP?.data?.data.token);
      } else {
        toast.error("Failed to send verification code");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSendingOTP(false);
    }
  };

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center py-8">
        <Spinner size={10} />
        {/* <span className="ml-2">Loading profile...</span> */}
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} disabled={submitting}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Personal Information</FieldLegend>
              <FieldGroup>
                <div className="flex flex-col gap-5">
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-firstName">
                          First Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-input-firstName"
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          autoComplete="firstName"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-lastName">
                          Last Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-input-lastName"
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          autoComplete="lastName"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-email">
                          Email
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="form-rhf-input-email"
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="email"
                            disabled={!allowEditEmail}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm p-1"
                            onClick={() => setShowVerifyModal(true)}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Password</FieldLegend>
              <FieldGroup>
                {!showPasswordFields ? (
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Password
                      </p>
                      <p className="text-sm text-gray-500">
                        Last updated:{" "}
                        {userData?.updatedAt
                          ? new Date(userData.updatedAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPasswordFields(true)}
                      disabled={submitting}
                    >
                      Change Password
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Change Password</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowPasswordFields(false);
                          form.setValue("oldPassword", "");
                          form.setValue("newPassword", "");
                          form.setValue("confirmPassword", "");
                        }}
                        disabled={submitting}
                      >
                        Cancel
                      </Button>
                    </div>

                    <Controller
                      name="oldPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-input-oldPassword">
                            Current Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-input-oldPassword"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your current password"
                            autoComplete="current-password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="newPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-input-newPassword">
                            New Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-input-newPassword"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your new password"
                            autoComplete="new-password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-input-confirmPassword">
                            Confirm New Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-input-confirmPassword"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="Confirm your new password"
                            autoComplete="new-password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <div className="ml-auto">
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                )}
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner /> Updating Profile...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
      <AlertDialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <AlertDialogContent>
          <ShieldQuestionMark className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <AlertDialogTitle className="text-lg font-medium text-gray-900 mb-2 text-center">
            Verify Email Address
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500 mb-4 text-center">
            To change your email address, please verify your identity. A
            one-time verification code will be sent to your current email
            address.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className={"flex-1"}>Cancel</AlertDialogCancel>
            <Button className={"flex-1"} onClick={() => sendOTP()}>
              {sendingOTP ? <Spinner /> : "Send Verification Code"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <OTPForm
        open={showOTPModal}
        onOpenChange={setShowOTPModal}
        token={otpToken}
        setAllowEditEmail={setAllowEditEmail}
        error={error}
      />
    </div>
  );
}
