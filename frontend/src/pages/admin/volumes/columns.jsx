import React, { useState } from "react";
import {
  CheckCircle2Icon,
  CircleAlert,
  CopyMinus,
  Edit,
  EllipsisVerticalIcon,
  Plus,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const volumeColumns = (onEdit, onUpdateStatus, submitting) => [
  {
    accessorKey: "banner",
    header: "",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue("banner")} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "volumeNo",
    header: "Volume No.",
    cell: ({ row }) => (
      <div className="w-10 truncate">{row.getValue("volumeNo")}</div>
    ),
  },
  {
    accessorKey: "seriesNo",
    header: "Series No.",
    cell: ({ row }) => (
      <div className="w-10 truncate">{row.getValue("seriesNo")}</div>
    ),
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => (
      <div className="w-20 truncate">{row.getValue("month")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => (
      <div className="w-10 truncate">{row.getValue("year")}</div>
    ),
  },
  {
    accessorKey: "doi",
    header: "DOI",
    cell: ({ row }) => (
      <div className="w-52 truncate">{row.getValue("doi")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div className="">{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [status, setStatus] = useState(row.original.status);
      const volumeId = row.original._id;

      const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        onUpdateStatus({ volumeId, newStatus });
      };

      return (
        <div>
          {status === "Active" ? (
            <span className="flex border text-sm border-green-600 bg-green-100 text-green-600 rounded-sm py-1 px-2 items-center gap-2 w-min">
              {" "}
              <CheckCircle2Icon size={15} /> Active{" "}
            </span>
          ) : (
            <span className="flex border text-sm border-red-500 text-red-500 bg-red-100 rounded-sm py-1 px-2 items-center gap-2 w-min">
              {" "}
              <CircleAlert size={15} /> Inactive
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const status = row.original.status;
      const publication = row.original;

      const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(publication._id);
      };
      const handleStatusChange = (e) => {
        e.stopPropagation();
        onUpdateStatus({
          volumeId: publication._id,
          newStatus: status === "Active" ? "0" : "1",
        });
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-5 w-5 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              Edit
              <Edit />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleStatusChange}>
              {status === "Active" ? (
                <>
                  Deactivate
                  <CircleAlert className="" />
                </>
              ) : (
                <>
                  Activate
                  <CheckCircle2Icon />
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
