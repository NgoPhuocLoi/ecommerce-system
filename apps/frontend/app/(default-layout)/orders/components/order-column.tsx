"use client";
import { PAYMENT_METHOD_ID_MAPPING } from "@repo/common/constants/payment";
import { OrderForShop } from "@repo/common/interfaces/order";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { DataTableColumnHeader } from "@repo/ui/components/ui/data-table/column-header";
import { OrderStatusChip } from "@repo/ui/components/ui/order-status-chip";
import { PaymentStatusChip } from "@repo/ui/components/ui/payment-status-chip";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

export const columns: ColumnDef<OrderForShop>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell({ row: { original } }) {
      return <p className="font-bold"># {original.order_id}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ngày" />;
    },
    cell({ row: { original } }) {
      return (
        <p>
          {DateTime.fromISO(original.created_at).toFormat("T -  dd.LL.yyyy")}
        </p>
      );
    },
  },
  {
    accessorKey: "customer.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Khách hàng" />;
    },
  },
  {
    accessorKey: "final_price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tổng tiền" />;
    },
    cell: ({ row: { original } }) => {
      return <p className="pl-2">{formatCurrency(original.final_price)}</p>;
    },
  },
  {
    accessorKey: "payment",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Thanh toán" />;
    },
    cell: ({ row: { original } }) => {
      return (
        <p>{PAYMENT_METHOD_ID_MAPPING[original.payment.payment_method_id]}</p>
      );
    },
  },
  {
    accessorKey: "payment_status_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Trạng thái thanh toán" />
      );
    },
    cell: ({ row: { original } }) => {
      return (
        <PaymentStatusChip statusId={original.payment.payment_status_id} />
      );
    },
  },

  {
    accessorKey: "order_status_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Trạng thái đơn hàng" />
      );
    },
    cell: ({ row: { original } }) => {
      return <OrderStatusChip statusId={original.current_status_id} />;
    },
  },
  {
    accessorKey: "total_items",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Số hàng" />;
    },
  },
];
