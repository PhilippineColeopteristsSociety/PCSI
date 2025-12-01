import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";

const VolumeForm = ({
  open,
  onOpenChange,
  data,
  submitting,
  title,
  form,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {data ? "Update the volume details below." : "Add a new volume."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="volumeNo">Volume Number</Label>
              <Input
                id="volumeNo"
                {...register("volumeNo")}
                placeholder="e.g., 1"
              />
              {errors.volumeNo && (
                <p className="text-sm text-red-600">
                  {errors.volumeNo.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="seriesNo">Series Number</Label>
              <Input
                id="seriesNo"
                {...register("seriesNo")}
                placeholder="e.g., 1"
              />
              {errors.seriesNo && (
                <p className="text-sm text-red-600">
                  {errors.seriesNo.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select
                value={watch("month")}
                onValueChange={(value) => setValue("month", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.month && (
                <p className="text-sm text-red-600">{errors.month.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select
                value={watch("year")}
                onValueChange={(value) => setValue("year", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.year && (
                <p className="text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doiLink">DOI Link (Optional)</Label>
            <Input
              id="doiLink"
              {...register("doiLink")}
              placeholder="https://doi.org/..."
            />
            {errors.doiLink && (
              <p className="text-sm text-red-600">{errors.doiLink.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={watch("status")}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {data ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolumeForm;
