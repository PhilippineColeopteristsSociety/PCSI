import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextEditor from "@/components/common/TextEditor";
import { Spinner } from "@/components/ui/spinner";
import { MAX_FILE_SIZE } from "@/constants/maxFileSize";
import volumeService from "@/services/volumeService";
import { Plus, Trash2 } from "lucide-react";

export default function ArticleForm({
  open,
  onOpenChange,
  onSubmit,
  data,
  submitting,
  title,
  form,
}) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeBanner, setRemoveBanner] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFilePreview, setPdfFilePreview] = useState(null);
  const [removePdfFile, setRemovePdfFile] = useState(false);
  const [volumes, setVolumes] = useState([]);
  const [volumeOptions, setVolumeOptions] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [pdfInputKey, setPdfInputKey] = useState(0);

  useEffect(() => {
    if (data && data.banner) {
      setImagePreview(data.banner);
      setImage(null);
      setRemoveBanner(false);
    } else if (!open) {
      setImage(null);
      setImagePreview(null);
      setRemoveBanner(false);
    }
  }, [data, open]);

  useEffect(() => {
    if (data && data.pdfFile) {
      setPdfFilePreview(data.pdfFile);
      setPdfFile(null);
      setRemovePdfFile(false);
    } else if (!open) {
      setPdfFile(null);
      setPdfFilePreview(null);
      setRemovePdfFile(false);
    }
  }, [data, open]);

  useEffect(() => {
    async function fetchVolumes() {
      const result = await volumeService.getVolumes();
      if (result.success) {
        setVolumes(result.data);
        // Create unique volume options
        const uniqueVolumes = Array.from(
          new Set(result.data.map((vol) => vol.volumeNo))
        ).sort((a, b) => a - b);
        setVolumeOptions(uniqueVolumes);
      } else {
        toast.error("Failed to load volumes");
      }
    }
    fetchVolumes();
  }, []);

  useEffect(() => {
    if (open) {
      setFileInputKey((prev) => prev + 1);
      setPdfInputKey((prev) => prev + 1);
    }
  }, [open]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "volumeNo") {
        const selectedVolumeNo = value.volumeNo;
        if (selectedVolumeNo) {
          const filteredSeries = volumes
            .filter((v) => v.volumeNo === selectedVolumeNo)
            .map((v) => v.seriesNo);

          const uniqueSeries = Array.from(new Set(filteredSeries));
          setSeriesOptions(uniqueSeries);
        } else {
          setSeriesOptions([]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, volumes]);

  // Populate seriesOptions when editing and volumes are loaded
  useEffect(() => {
    if (data && volumes.length > 0) {
      const selectedVolumeNo = data.volumeNo;
      if (selectedVolumeNo) {
        const filteredSeries = volumes
          .filter((v) => v.volumeNo === selectedVolumeNo)
          .map((v) => v.seriesNo);

        const uniqueSeries = Array.from(new Set(filteredSeries));
        setSeriesOptions(uniqueSeries);
      }
    }
  }, [data, volumes]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit`
        );
        if (fileInputRef.current) fileInputRef.current.value = null;
        return;
      }
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .jpg, .jpeg, and .png files are allowed");
        if (fileInputRef.current) fileInputRef.current.value = null;
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setRemoveBanner(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setRemoveBanner(true);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit`
        );
        if (pdfInputRef.current) pdfInputRef.current.value = null;
        return;
      }
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .pdf files are allowed");
        if (pdfInputRef.current) pdfInputRef.current.value = null;
        return;
      }
      setPdfFile(file);
      setPdfFilePreview(file.name);
      setRemovePdfFile(false);
    }
  };

  const handleRemovePdfFile = () => {
    setPdfFile(null);
    setPdfFilePreview(null);
    setRemovePdfFile(true);
    if (pdfInputRef.current) pdfInputRef.current.value = null;
  };

  const handleFormSubmit = (formData) => {
    const submissionData = {
      ...formData,
      volumeNo: formData.volumeNo ? Number(formData.volumeNo) : undefined,
      seriesNo: formData.seriesNo ? Number(formData.seriesNo) : undefined,
      image,
      removeBanner: removeBanner && !image,
      existingBanner: data?.banner,
      pdfFile,
      removePdfFile: removePdfFile && !pdfFile,
      existingPdfFile: data?.pdfFile,
    };
    onSubmit(submissionData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
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
                            X
                          </button>
                        </>
                      ) : (
                        <label
                          htmlFor="banner-upload"
                          className="h-full w-full flex flex-col items-center justify-center font-semibold text-muted-foreground cursor-pointer"
                        >
                          <input
                            key={fileInputKey}
                            ref={fileInputRef}
                            id="banner-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          Upload Image
                        </label>
                      )}
                    </div>
                    <FieldDescription className="text-xs">
                      Accepted formats: .jpg, .jpeg, .png | Max size: 5 MB
                    </FieldDescription>
                  </Field>

                  <Field>
                    <div className="relative min-h-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {pdfFilePreview ? (
                        <>
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              className="w-12 h-12 text-red-500 mb-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-sm font-medium text-gray-900">
                              {pdfFilePreview}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemovePdfFile}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                          >
                            X
                          </button>
                        </>
                      ) : (
                        <label
                          htmlFor="pdf-upload"
                          className="h-full w-full flex flex-col items-center justify-center font-semibold text-muted-foreground cursor-pointer"
                        >
                          <input
                            ref={pdfInputRef}
                            id="pdf-upload"
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfChange}
                            className="hidden"
                          />
                          Upload PDF
                        </label>
                      )}
                    </div>
                    <FieldDescription className="text-xs">
                      Accepted formats: .pdf | Max size: 5 MB
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
                            <Select
                              value={field.value ? field.value.toString() : ""}
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Volume" />
                              </SelectTrigger>
                              <SelectContent>
                                {volumeOptions.map((volumeNo) => (
                                  <SelectItem
                                    key={volumeNo}
                                    value={volumeNo.toString()}
                                  >
                                    {volumeNo}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                            <Select
                              value={field.value ? field.value.toString() : ""}
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              disabled={seriesOptions.length === 0}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Series" />
                              </SelectTrigger>
                              <SelectContent>
                                {seriesOptions.map((seriesNo, idx) => (
                                  <SelectItem
                                    key={idx}
                                    value={seriesNo.toString()}
                                  >
                                    {seriesNo}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                            value={field.value ? field.value.toString() : ""}
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ? field.value.toString() : ""}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 50 }, (_, i) => {
                                const year = (
                                  new Date().getFullYear() - i
                                ).toString();
                                return (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="abstract"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Abstract</FormLabel>
                        <FormControl>
                          <TextEditor
                            content={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter keywords, separated by commas"
                            {...field}
                          />
                        </FormControl>
                        {/* Removed as per request: Separate keywords with commas. */}
                        {/* <FieldDescription>
                            Separate keywords with commas.
                          </FieldDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DOI</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter DOI URL (e.g., https://doi.org/10.59120/drj.v16i3.423)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pageRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page Range</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter page range (e.g., 6-16)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="authors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author(s)</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {field.value?.map((author, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-4 space-y-4"
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-medium">
                                    Author {index + 1}
                                  </h4>
                                  {field.value.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const newAuthors = field.value.filter(
                                          (_, i) => i !== index
                                        );
                                        form.setValue("authors", newAuthors);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      Delete
                                    </Button>
                                  )}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`authors.${index}.firstname`}
                                    render={({ field: authorField }) => (
                                      <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter first name"
                                            {...authorField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`authors.${index}.middlename`}
                                    render={({ field: authorField }) => (
                                      <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter middle name"
                                            {...authorField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`authors.${index}.lastname`}
                                    render={({ field: authorField }) => (
                                      <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter last name"
                                            {...authorField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <FormField
                                  control={form.control}
                                  name={`authors.${index}.department`}
                                  render={({ field: authorField }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Department/Organization
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter department/organization"
                                          {...authorField}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`authors.${index}.school`}
                                  render={({ field: authorField }) => (
                                    <FormItem>
                                      <FormLabel>School</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter school"
                                          {...authorField}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`authors.${index}.city`}
                                    render={({ field: authorField }) => (
                                      <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter city"
                                            {...authorField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`authors.${index}.country`}
                                    render={({ field: authorField }) => (
                                      <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter country"
                                            {...authorField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const newAuthors = [
                                  ...(field.value || []),
                                  {
                                    firstname: "",
                                    middlename: "",
                                    lastname: "",
                                    department: "",
                                    school: "",
                                    city: "",
                                    country: "",
                                  },
                                ];
                                form.setValue("authors", newAuthors);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Author
                            </Button>
                          </div>
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
