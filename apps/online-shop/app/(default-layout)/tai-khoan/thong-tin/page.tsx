import React from "react";
import { getCurrentCustomerProfile } from "../../../../actions/customer";

const Page = async () => {
  const currentCustomer = await getCurrentCustomerProfile();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Thông tin tài khoản</h1>

      <div className="mt-4 grid grid-cols-3 gap-4 text-lg">
        <span className="text-gray-500">Họ và tên</span>
        <span className="col-span-2">
          {currentCustomer.lastName} {currentCustomer.firstName}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-lg">
        <span className="text-gray-500">Email</span>
        <span className="col-span-2">{currentCustomer.email}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-lg">
        <span className="text-gray-500">Giới tính</span>
        <span className="col-span-2 text-gray-500 text-sm italic">
          (Chưa hỗ trợ)
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-lg">
        <span className="text-gray-500">Ngày sinh</span>
        <span className="col-span-2 text-gray-500 text-sm italic">
          (Chưa hỗ trợ)
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-lg">
        <span className="text-gray-500">Chiều cao</span>
        <span className="col-span-2 text-gray-500 text-sm italic">
          (Chưa hỗ trợ)
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-lg">
        <span className="text-gray-500">Cân nặng</span>
        <span className="col-span-2 text-gray-500 text-sm italic">
          (Chưa hỗ trợ)
        </span>
      </div>
    </div>
  );
};

export default Page;
