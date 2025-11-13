import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { CheckCircle2, XCircle } from "lucide-react";

export default function VerifyEmailCard({ className, ...props }) {
  const [status, setStatus] = useState("success"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const hasVerified = useRef(false); // Prevent duplicate API calls
  
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      // Prevent duplicate API calls (React StrictMode causes double renders)
      if (hasVerified.current) {
        return;
      }

      if (!props.token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        setShowErrorDialog(true);
        return;
      }

      // Mark as verified before making the API call
      hasVerified.current = true;

      try {
        const result = await authService.verifyEmail(props.token);
        console.log(result)
        // if (result.success) {
        //   setStatus("success");
        //   setMessage(result.data.message || "Your email has been successfully verified!");
        // } else {
        //   setStatus("error");
        //   setMessage(result.error || "Email verification failed. Please try again.");
        //   setShowErrorDialog(true);
        // }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
        setShowErrorDialog(true);
      }
    };

    verifyEmail();
  }, [props.token]);

  const handleLoginRedirect = () => {
    navigate("/admin/auth/login");
  };

  const handleCloseError = () => {
    setShowErrorDialog(false);
    navigate("/admin/auth/login");
  };

  return (
    <div className={cn(" gap-6", className)} {...props}>
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Email Verification
          </CardTitle>
          <CardDescription>
            {status === "verifying" && "Please wait while we verify your email address..."}
            {status === "success" && "Verification Complete"}
            {status === "error" && "Verification Failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          {status === "verifying" && (
            <div className="flex flex-col items-center gap-4">
              <Spinner className="h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Verifying your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-green-700">
                  Successfully Verified!
                </p>
                <p className="text-sm text-muted-foreground">
                  {message}
                </p>
              </div>
            </div>
          )}

          {status === "error" && !showErrorDialog && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-red-700">
                  Verification Failed
                </p>
                <p className="text-sm text-muted-foreground">
                  {message}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === "success" && (
            <Button onClick={handleLoginRedirect} className="w-full">
              Continue to Login
            </Button>
          )}
          {status === "error" && !showErrorDialog && (
            <Button 
              variant="outline" 
              onClick={handleLoginRedirect} 
              className="w-full"
            >
              Back to Login
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Error Alert Dialog */}
      <AlertDialog open={false} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Verification Failed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleCloseError}>
              Back to Login
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
