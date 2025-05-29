import db from "../models";

//GET ALL AREARANGES

export const getAreaRangesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.AreaRange.findAll({
        order: [["from"]],
        raw: true,
      }); //bình thường trả ve instance chứa data và một vài thông số khác. Nhưng có raw:true thì trả về data{}
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get areaRange Service.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//CREATE ALL AREARANGE
export const createAreaRangeService = ({ title, from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.AreaRange.findOrCreate({
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
        msg: response[1] ? "Create successfully" : "AreaRange already exist!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//UPDATE AREARANGE
export const updateAreaRangeService = ({ id, title, from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.AreaRange.update(
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
        msg: response[0] ? "Update successfully" : "AreaRange not found!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//DELETE AREARANGE
export const deleteAreaRangeService = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.AreaRange.destroy({
        where: {
          id,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Delete successfully!" : "AreaRange not found!",
        response,
      });
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
};

//GET AREARANGE BY ID
export const getAreaRangeService = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.AreaRange.findOne({
        where: {
          id,
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get successfully!" : "AreaRange not found!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
