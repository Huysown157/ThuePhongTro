import db from "../models";

//GET ALL priceRANGES

export const getPriceRangesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.PriceRange.findAll({
        order: [["from"]],
        raw: true,
      }); //bình thường trả ve instance chứa data và một vài thông số khác. Nhưng có raw:true thì trả về data{}
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get PriceRange Service.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//CREATE ALL priceRANGE
export const createPriceRangeService = ({ title, from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.PriceRange.findOrCreate({
        where: {
          title,
        },
        defaults: {
          title,
          from,
          to,
        },
      });

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Create successfully" : "PriceRange already exist!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//UPDATE priceRANGE
export const updatePriceRangeService = ({ id, title, from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.PriceRange.update(
        {
          title,
          from,
          to,
        },
        {
          where: {
            id,
          },
        }
      );

      resolve({
        err: response[0] ? 0 : 1,
        msg: response[0] ? "Update successfully" : "PriceRange not found!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//DELETE priceRANGE
export const deletePriceRangeService = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.PriceRange.destroy({
        where: {
          id,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Delete successfully!" : "PriceRange not found!",
        response,
      });
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
};

//GET priceRANGE BY ID
export const getPriceRangeService = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.PriceRange.findOne({
        where: {
          id,
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get successfully!" : "PriceRange not found!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
