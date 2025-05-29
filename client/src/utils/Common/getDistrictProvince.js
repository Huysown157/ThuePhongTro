export const getDistrictProvince = (address) => {
  if (address) {
    return `${address?.split(",")[address?.split(",")?.length - 2]}, ${
      address.split(",")[address.split(",").length - 1]
    }`;
  }
};
