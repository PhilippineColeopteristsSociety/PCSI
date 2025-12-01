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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, File, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextEditor from "@/components/common/TextEditor";
import { Spinner } from "@/components/ui/spinner";
import { MAX_FILE_SIZE } from "@/constants/maxFileSize";

export default function VolumeForm({
  open,
  onOpenChange,
  onSubmit,
  data, // Add this prop to receive current data
  submitting,
  title,
  form,
}) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeBanner, setRemoveBanner] = useState(false);
  const fileInputRef = useRef(null);

  // Effect to handle existing image when editing
  useEffect(() => {
    if (data && data.banner) {
      // If editing and has existing banner, show it as preview
      setImagePreview(data.banner);
      setImage(null); // No new file selected yet
      setRemoveBanner(false); // Reset remove flag
    } else if (!open) {
      // Reset when form closes
      setImage(null);
      setImagePreview(null);
      setRemoveBanner(false);
    }
  }, [data, open]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit`
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        return;
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
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
    setRemoveBanner(true); // Mark that user wants to remove the banner
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFormSubmit = (formData) => {
    const submissionData = {
      ...formData,
      image: image, // New image file if one was selected
      removeBanner: removeBanner && !image, // True if user clicked X and didn't upload new image
      existingBanner: data?.banner, // Pass existing banner URL for backend reference
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
                            alt="Publication banner"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                          >
                            <X size={16} />
                          </button>
                          {/* {data?.banner && !image && (
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              Existing Banner
                            </div>
                          )} */}
                        </>
                      ) : (
                        <label
                          htmlFor="banner-upload"
                          className="h-full w-full flex flex-col items-center justify-center font-semibold text-muted-foreground cursor-pointer"
                        >
                          <File size={30} />
                          <span>Upload Image</span>
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
                    <FieldDescription className={"text-xs"}>
                      Accepted formats: .jpg, .jpeg, .png | Max size: 5 MB
                    </FieldDescription>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="volumeNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Volume No.</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter No."
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : ""
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seriesNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Series No.</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter No."
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : ""
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Month</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="January">January</SelectItem>
                              <SelectItem value="February">February</SelectItem>
                              <SelectItem value="March">March</SelectItem>
                              <SelectItem value="April">April</SelectItem>
                              <SelectItem value="May">May</SelectItem>
                              <SelectItem value="June">June</SelectItem>
                              <SelectItem value="July">July</SelectItem>
                              <SelectItem value="August">August</SelectItem>
                              <SelectItem value="September">
                                September
                              </SelectItem>
                              <SelectItem value="October">October</SelectItem>
                              <SelectItem value="November">November</SelectItem>
                              <SelectItem value="December">December</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter Year"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : ""
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="doi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DOI</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter DOI" {...field} />
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
