import React, { useState } from "react";
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
import { MAX_FILE_SIZE } from "@/constants/maxFileSize";

export default function FeatureForm({
  open,
  onOpenChange,
  onSubmit,
  submitting,
  title,
  form,
}) {
   const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 10 MB limit");
        e.target.value = null; // Reset file input
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .jpg, .jpeg, and .png files are allowed");
        e.target.value = null;
        return;
      }

      setImage(file);
      
      // Create preview
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
    // Reset file input if it exists
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = null;
  };

  const handleFormSubmit = (formData) => {
    const submissionData = {
      ...formData,
      image: image, // Add the image file to submission data
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
        <div className="overflow-y-auto max-h-[calc(95vh-120px)] ">
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
                            alt="Uploaded banner"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <label
                          htmlFor="banner-upload"
                          className="h-full w-full flex flex-col items-center justify-center font-semibold text-muted-foreground cursor-pointer"
                        >
                          <File size={30} />
                          <span>Upload Banner</span>
                          <input
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter featured beetle name"
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
                            placeholder="Enter description..."
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
