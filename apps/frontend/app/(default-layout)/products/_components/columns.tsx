"use client";
import { Product } from "@repo/common/interfaces/product";
import { Badge } from "@repo/ui/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";
import { DataTableColumnHeader } from "@repo/ui/components/ui/data-table/column-header";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tên" />;
    },
    cell({ row: { original } }) {
      return (
        <div className="flex items-center gap-2">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="40"
            src={
              original.images[0]?.url ??
              "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            width="40"
          />
          <p>{original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Trạng thái" />;
    },
    cell: ({ row }) => {
      const value = row.original.is_active ? "active" : "inactive";
      const isActive = value === "active";
      return (
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={clsx({
            "bg-green-500 hover:bg-green-500": isActive,
          })}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "available_quantity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Số lượng" />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Giá" />;
    },
  },
  {
    accessorKey: "category.name",
    header: "Danh mục",
  },
];
