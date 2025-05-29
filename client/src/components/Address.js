import React, { memo, useEffect, useState } from "react";
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from "../services";
import InputReadOnly from "./InputReadOnly";
import SelectForm from "./SelectForm";
import { useSelector } from "react-redux";

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);

  // console.log(dataEdit);

  const [provinces, setProvinces] = useState([]);
  // console.log(provinces);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchPublicProvinces = async () => {
      const response = await apiGetPublicProvinces();
      // console.log(response);

      if (response.status === 200) {
        setProvinces(response?.data?.results);
      }
    };
    fetchPublicProvinces();
  }, []);

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      let addressArr = dataEdit?.address?.split(", ");

      const findDistrict =
        districts?.length > 0 &&
        districts?.find((item) => item.district_name === addressArr[1]);
      setDistrict(findDistrict?.district_id || "");
    }
  }, [districts, dataEdit]);

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      let addressArr = dataEdit?.address?.split(", ");
      const findWard =
        wards?.length > 0 &&
        wards?.find((item) => item.ward_name === addressArr[0]);

      setWard(findWard?.ward_id || "");
    }
  }, [wards, dataEdit]);

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      let addressArr = dataEdit?.address?.split(", ");

      if (provinces.length) {
        const findProvince = provinces.find(
          (item) => item?.province_name === addressArr[addressArr?.length - 1]
        );
        setProvince(findProvince?.province_id || "");
      }
    }
  }, [provinces, dataEdit]);

  useEffect(() => {
    setDistrict();
    const fetchPublicDistricts = async () => {
      const response = await apiGetPublicDistricts(province);
      // console.log(response);
      if (response.status === 200) {
        setDistricts(response?.data?.results);
      }
    };
    province && fetchPublicDistricts();
    !province ? setReset(true) : setReset(false);
  }, [province]);

  useEffect(() => {
    setWard();
    const fetchPublicWards = async () => {
      const response = await apiGetPublicWards(district);
      // console.log(response);
      if (response.status === 200) {
        setWards(response?.data?.results);
      }
    };
    district && fetchPublicWards();
    !district ? setReset(true) : setReset(false);
  }, [district]);

  // console.log({ province, district, ward });

  //Lay data tat ca inputs
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        ward
          ? `${wards?.find((item) => item.ward_id === ward)?.ward_name}, `
          : ""
      }${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            }, `
          : ""
      }${
        province
          ? `${
              provinces?.find((item) => item.province_id === province)
                ?.province_name
            }`
          : ""
      }`,
      province: province
        ? `${
            provinces?.find((item) => item.province_id === province)
              ?.province_name
          }`
        : "",
    }));
  }, [province, district, ward]);

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl ">Địa chỉ cho thuê</h2>
      <div className="flex w-full items-center gap-6">
        <SelectForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={province}
          setValue={setProvince}
          options={provinces}
          label={"Tỉnh/Thành phố"}
          type="province"
        />
        <SelectForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          reset={reset}
          value={district}
          setValue={setDistrict}
          options={districts}
          label={"Quận/Huyện"}
          type="district"
        />
        <SelectForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          reset={reset}
          value={ward}
          setValue={setWard}
          options={wards}
          label={"Xã/Phường"}
          type="ward"
        />
      </div>
      <InputReadOnly
        label={"Thông tin chính xác"}
        value={`${
          ward
            ? `${wards?.find((item) => item.ward_id === ward)?.ward_name}, `
            : ""
        }${
          district
            ? `${
                districts?.find((item) => item.district_id === district)
                  ?.district_name
              }, `
            : ""
        }${
          province
            ? `${
                provinces?.find((item) => item.province_id === province)
                  ?.province_name
              }`
            : ""
        }`}
      />
    </div>
  );
};

export default memo(Address);
