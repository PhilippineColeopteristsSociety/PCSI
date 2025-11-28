import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import contactService from "@/services/contactService";
import { toast } from "sonner";

export default function ContactModal({ open, onOpenChange, subject = "", body = "" }) {
  const [formData, setFormData] = useState({
    email: "",
    subject: subject,
    body: body,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update form when props change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subject: subject,
      body: body,
    }));
  }, [subject, body]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // API submission (commented out)
    // setIsLoading(true);
    // try {
    //   await contactService.sendContactEmail(formData);
    //   toast.success("Email sent successfully!");
    //   // Reset form and close modal
    //   setFormData({
    //     email: "",
    //     subject: "",
    //     body: "",
    //   });
    //   onOpenChange(false);
    // } catch (error) {
    //   console.error("Error sending email:", error);
    //   toast.error(error.response?.data?.message || "Failed to send email. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }

    // Use mailto instead
    handleMailTo();
  };

  const handleMailTo = () => {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `From: ${formData.email}\n\n${formData.body}`
    );
    
    const mailtoLink = `mailto:philcolsoc@gmail.com?subject=${subject}&body=${body}`;
    
    // Create a temporary anchor element and click it
    const anchor = document.createElement('a');
    anchor.href = mailtoLink;
    anchor.click();
    
    // Reset form and close modal
    setFormData({
      email: "",
      subject: "",
      body: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-bold flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Send Email
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to send an email to philcolsoc@gmail.com
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message *</Label>
            <Textarea
              id="body"
              name="body"
              placeholder="Enter your message"
              value={formData.body}
              onChange={handleChange}
              rows={6}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
