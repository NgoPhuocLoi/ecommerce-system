import { getCustomersForAdmin } from "@repo/common/actions/admin-mamagement";
import { CustomerForAdmin } from "@repo/common/interfaces/customer";
import { DataTable } from "@repo/ui/components/ui/data-table/index";
import { columns } from "./customer-column";

const CustomerTable = async () => {
  const customers: CustomerForAdmin[] = await getCustomersForAdmin();
  return (
    <div>
      <DataTable
        columns={columns}
        data={customers.map((customer) => ({
          ...customer,
          link: `/customers/${customer.id}`,
        }))}
      />
    </div>
  );
};

export default CustomerTable;
