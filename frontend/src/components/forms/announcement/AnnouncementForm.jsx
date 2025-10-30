import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextEditor from "@/components/common/TextEditor";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { MAX_FILE_SIZE } from "@/constants/maxFileSize";

export default function AnnouncementForm({
  open,
  onOpenChange,
  onSubmit,
  submitting,
  title,
  form,
  data, // Add this prop to receive current data
}) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Effect to handle existing image when editing
  useEffect(() => {
    if (data && data.banner) {
      // If editing and has existing image, show it as preview
      setImagePreview(data.banner);
      setImage(null); // No new file selected yet
    } else if (!open) {
      // Reset when form closes
      setImage(null);
      setImagePreview(null);
    }
  }, [data, open]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 10 MB limit");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .jpg, .jpeg, and .png files are allowed");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        return;
      }

      setImage(file);
      
      // Create preview for new file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFormSubmit = (formData) => {
    const submissionData = {
      ...formData,
      image: image, // Only include new image file if one was selected
      existingImage: data?.image, // Pass existing image URL for backend to handle
    };
    
    onSubmit(submissionData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={""} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className={"text-start"}>{title}</DialogTitle>
          <DialogDescription className={"text-start"}>
            Please fill in all required fields and click submit to save.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <FieldGroup>
                <FieldSet>
                  <Field>
                    <div className="relative min-h-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Announcement banner"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                          >
                            <X size={16} />
                          </button>
                          {data?.image && !image && (
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              Existing Image
                            </div>
                          )}
                        </>
                      ) : (
                        <label
                          htmlFor="banner-upload"
                          className="h-full w-full flex flex-col items-center justify-center font-semibold text-muted-foreground cursor-pointer"
                        >
                          <File size={30} />
                          <span>Upload Banner</span>
                          <input
                            ref={fileInputRef}
                            id="banner-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </Field>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter announcement title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <TextEditor
                            content={field.value}
                            onChange={field.onChange}
                            placeholder="Enter announcement description..."
                            className="min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FieldSet>

                <Field orientation="horizontal">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Spinner /> Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={submitting}
                  >
                    Cancel
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
