import React, { useState } from "react";
import {
  CheckCircle2Icon,
  CircleAlert,
  Edit,
  EllipsisVerticalIcon,
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

export const articleColumns = (onEdit, onUpdateStatus, submitting) => [
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
    header: "Vol. No.",
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      const words =
        title.split(" ").slice(0, 6).join(" ") +
        (title.split(" ").length > 6 ? "..." : "");
      return (
        <div className="w-64 truncate" title={title}>
          {words}
        </div>
      );
    },
  },
  {
    accessorKey: "abstract",
    header: "Abstract",
    cell: ({ row }) => {
      const abstract = row.getValue("abstract");
      const words =
        abstract.split(" ").slice(0, 6).join(" ") +
        (abstract.split(" ").length > 6 ? "..." : "");
      return (
        <div className="w-64 truncate" title={abstract}>
          {words}
        </div>
      );
    },
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      const keywords = row.getValue("keywords");
      if (Array.isArray(keywords)) {
        return (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-lg"
                title={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
        );
      }
      return null;
    },
  },
  {
    accessorKey: "doi",
    header: "DOI",
    cell: ({ row }) => (
      <div className="w-52 truncate">{row.getValue("doi")}</div>
    ),
  },
  {
    accessorKey: "authors",
    header: "Authors",
    cell: ({ row }) => {
      const authors = row.getValue("authors");
      if (Array.isArray(authors)) {
        const authorNames = authors
          .map((author) => {
            const firstName = author.firstName || author.firstname;
            const lastName = author.lastName || author.lastname;
            return `${firstName} ${lastName}`;
          })
          .join(", ");
        return (
          <div className="w-64 truncate" title={authorNames}>
            {authorNames}
          </div>
        );
      }
      return null;
    },
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
              <CheckCircle2Icon size={15} /> Active
            </span>
          ) : (
            <span className="flex border text-sm border-red-500 text-red-500 bg-red-100 rounded-sm py-1 px-2 items-center gap-2 w-min">
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
                  <CircleAlert />
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
