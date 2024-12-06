"use client";
import { CustomerForAdmin } from "@repo/common/interfaces/customer";
import { DataTableColumnHeader } from "@repo/ui/components/ui/data-table/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

export const columns: ColumnDef<CustomerForAdmin>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tên khách hàng" />;
    },
    cell({ row: { original } }) {
      return (
        <p>
          {original.lastName} {original.firstName}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "orderCount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tổng cửa hàng" />;
    },
    cell({ row: { original } }) {
      return <p>{original.shops.length}</p>;
    },
  },
  // {
  //   accessorKey: "totalSpent",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Tổng chi tiêu" />;
  //   },
  //   cell: ({ row: { original } }) => {
  //     return <p className="pl-2">{formatCurrency(original.totalSpent)}</p>;
  //   },
  // },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ngày tham gia" />;
    },
    cell: ({ row: { original } }) => {
      return (
        <p>{DateTime.fromISO(original.createdAt).toFormat("dd.LL.yyyy")}</p>
      );
    },
  },
];
