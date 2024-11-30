import { getOrders } from "../../../../actions/order";
import OrderCard from "./components/order-card";

const Page = async () => {
  const orders = await getOrders();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Lịch sử đơn hàng</h1>

      <p className="text-gray-600">
        Đơn hàng của bạn: {orders.length} đơn hàng
      </p>

      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Page;
