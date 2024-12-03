import { getOrdersForShop } from "@repo/common/actions/shop-managenent";
import { OrderForShop } from "@repo/common/interfaces/order";
import { DataTable } from "@repo/ui/components/ui/data-table/index";
import { columns } from "./order-column";

const CustomerTable = async () => {
  const orders: OrderForShop[] = await getOrdersForShop();
  return (
    <div>
      <DataTable
        columns={columns}
        data={orders.map((order) => ({
          ...order,
          link: `/orders/${order.order_id}`,
        }))}
      />
    </div>
  );
};

export default CustomerTable;
