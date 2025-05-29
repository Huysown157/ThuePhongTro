import db from "../models";

//GET ALL PROVINCE

export const getProvincesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        attributes: ["id", "province"],
        group: "province",
      });

      for (let i = 0; i < response.length; i++) {
        response[i].title = response[i].province;
        delete response[i].province;
      }
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get provincesService.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
