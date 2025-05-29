//Ham chuyển title -> slug
export const convertToSlug = (keyword) => {
  return keyword
    ?.toLowerCase()
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.split(" ")
    ?.join("-");
  // return keyword;
};
