export interface DeliveryAddress {
  deliveryAddressId: number;
  provinceName: string;
  provinceId: number;
  districtName: string;
  districtId: number;
  wardName: string;
  wardCode: string;
  phone: string;
  detailAddress: string;
  isDefault: boolean;
  isDeleted: boolean;
  customerId: number;
}
