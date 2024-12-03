import { getCustomersForShop } from "@repo/common/actions/shop-managenent";
import { CustomerForShop } from "@repo/common/interfaces/customer";
import { DataTable } from "@repo/ui/components/ui/data-table/index";
import { columns } from "./customer-column";

const CustomerTable = async () => {
  const customers: CustomerForShop[] = await getCustomersForShop();
  return (
    <div>
      <DataTable columns={columns} data={customers} />
    </div>
  );
};

export default CustomerTable;
