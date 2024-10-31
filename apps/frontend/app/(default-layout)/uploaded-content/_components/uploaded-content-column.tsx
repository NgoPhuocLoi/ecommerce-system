"use client";
import { PreviewUploadedContent } from "app/interfaces/uploaded-content";
import { DataTableColumnHeader } from "@repo/ui/components/ui/data-table/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Link2 } from "lucide-react";
import { DateTime } from "luxon";
import Image from "next/image";
import prettyBytes from "pretty-bytes";
import { toast } from "sonner";

export const columns: ColumnDef<PreviewUploadedContent>[] = [
  {
    accessorKey: "public_id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="File name" />;
    },
    cell({ row: { original } }) {
      return (
        <div className="flex items-center gap-2">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-contain"
            height="40"
            src={original.url}
            width="40"
          />
          <p>{original.uploaded_public_id}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date added" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {DateTime.fromISO(row.original.created_at).toLocaleString(
            {},
            {
              locale: "vi-VN",
            },
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "bytes",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Size" />;
    },
    cell: ({ row }) => {
      return <span>{prettyBytes(row.original.size)}</span>;
    },
  },
  {
    accessorKey: "something",
    header: "References",
    cell: ({ row }) => {
      return <div className="w-full pl-10">--</div>;
    },
  },
  {
    accessorKey: "url",
    header: "Link",
    cell: ({ row }) => {
      return (
        <div
          title="Click to copy url"
          className="w-fit cursor-pointer rounded-md p-2 hover:bg-gray-200"
          onClick={() => {
            navigator.clipboard.writeText(row.original.url);
            toast.info("Copied to clipboard");
          }}
        >
          <Link2 size={16} className="text-gray-600" />
        </div>
      );
    },
  },
];
