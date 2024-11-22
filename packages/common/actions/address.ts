import { ADDRESS_API } from "../constants";
import { extractMetadataFromResponseClientSide } from "../utils/extract-metadata";
import { Province } from "../interfaces/address";

export const getProvinces = async (): Promise<Province[]> => {
  const res = await fetch(`${ADDRESS_API}/provinces`);

  return extractMetadataFromResponseClientSide(res, []);
};

export const getDistrictsByProvinceId = async (provinceId: number) => {
  const res = await fetch(`${ADDRESS_API}/districts?provinceId=${provinceId}`);
  console.log({ res });
  return extractMetadataFromResponseClientSide(res, []);
};

export const getWardsByDistrictId = async (districtId: number) => {
  const res = await fetch(`${ADDRESS_API}/wards?districtId=${districtId}`);

  return extractMetadataFromResponseClientSide(res, []);
};
