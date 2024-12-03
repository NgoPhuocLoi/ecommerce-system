"use client";
import { CustomerForShop } from "@repo/common/interfaces/customer";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { DataTableColumnHeader } from "@repo/ui/components/ui/data-table/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

export const columns: ColumnDef<CustomerForShop>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tên khách hàng" />;
    },
    cell({ row: { original } }) {
      return (
        <p>
          {original.last_name} {original.first_name}
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
      return <DataTableColumnHeader column={column} title="Tổng đơn hàng" />;
    },
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tổng chi tiêu" />;
    },
    cell: ({ row: { original } }) => {
      return <p className="pl-2">{formatCurrency(original.totalSpent)}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ngày tạo" />;
    },
    cell: ({ row: { original } }) => {
      return (
        <p>{DateTime.fromISO(original.created_at).toFormat("dd.LL.yyyy")}</p>
      );
    },
  },
];
