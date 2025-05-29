import db from "../models";

//GET CURRENT USER

export const getCurrentUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        }, //chỉ định trường cần lấy data
      }); //bình thường trả ve instance chứa data và một vài thông số khác. Nhưng có raw:true thì trả về data{}
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get one user service.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//GET ALL USERS
export const getUsersService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        where: { role: "user" },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });

      resolve({
        err: 0,
        msg: "OK",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//GET ONE USER
export const getUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });

      if (!response) {
        return resolve({
          err: 1,
          msg: "User not found.",
          response,
        });
      }

      resolve({
        err: 0,
        msg: "OK",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//UPDATE USER
export const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(data, {
        where: { id },
      });

      if (response == 0) {
        return resolve({
          err: 1,
          msg: "Not found user to update",
        });
      }

      resolve({
        err: 0,
        msg: "Updated",
        response,
      });
    } catch (error) {
      console.log("error service update user:::", error);
      reject(error);
    }
  });
};

//DELETE USER
export const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { id },
      });

      if (response == 0) {
        return resolve({
          err: 1,
          msg: "Not found user to delete",
        });
      }

      resolve({
        err: 0,
        msg: "Deleted",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
