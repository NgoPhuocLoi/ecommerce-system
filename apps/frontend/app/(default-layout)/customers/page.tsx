import CustomerTable from "./components/customer-table";

const Page = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <CustomerTable />
    </main>
  );
};

export default Page;
