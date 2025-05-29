import db from "../models";
import APIError from "../utils/apiError";

const favoriteService = {
  addAndFindExist: (userId, postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Favorite.findOrCreate({
          where: {
            userId,
            postId,
          },
          defaults: {
            userId,
            postId,
          },
        });

        resolve(response[1] ? true : false);
      } catch (error) {
        reject(error);
      }
    });
  },

  remove: (userId, postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Favorite.destroy({
          where: {
            userId,
            postId,
          },
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },

  getAllByUserId: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Favorite.findAll({
          where: {
            userId,
          },
          include: [
            {
              model: db.Post,
              as: "post",
              include: [
                { model: db.Image, as: "images", attributes: ["url"] },
                { model: db.User, as: "user" },
              ],
            },
          ],
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  create: (userId, postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await favoriteService.addAndFindExist(userId, postId);
        if (!response) {
          await favoriteService.remove(userId, postId);
        }

        resolve({
          err: 0,
          msg: "Create successfully!",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default favoriteService;
