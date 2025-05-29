import db from "../models";
import { Op } from "sequelize";

//GET ALL POSTS
export const getPostsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "image", attributes: ["url"] },

          {
            model: db.User,
            as: "user",
            attributes: ["fullName", "phone"],
          },
        ],
        // attributes: ["id", "title", "address", "description"], //bao gom cả data đã include ở trên
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed at post Service",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//GET POST LIMIT
export const getPostsLimitService = (page, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;

      const categoryId = +query.categoryId || "";
      const province = query.province || "";
      const priceRangeStart = +query.priceRangeStart || 0;
      const priceRangeEnd = +query.priceRangeEnd || 9999999;
      const areaRangeStart = +query.areaRangeStart || 0;
      const areaRangeEnd = +query.areaRangeEnd || 99999999;
      const priceRangeId = +query.priceRangeId || 0;
      const areaRangeId = +query.areaRangeId || 0;
      const isNew = +query.isNew || 0;
      const status = query.status || "";

      const response = await db.Post.findAll({
        // logging: true,

        where: {
          price: {
            [Op.between]: [priceRangeStart, priceRangeEnd],
          },
          area: {
            [Op.between]: [areaRangeStart, areaRangeEnd],
          },
          province: {
            [Op.substring]: province,
          },
          categoryId: {
            [categoryId === "" ? Op.ne : Op.eq]: categoryId,
          },
          priceRangeId: {
            [priceRangeId === 0 ? Op.is : Op.eq]:
              priceRangeId === 0 ? !null : priceRangeId,
          },
          areaRangeId: {
            [areaRangeId === 0 ? Op.is : Op.eq]:
              areaRangeId === 0 ? !null : areaRangeId,
          },
          status: {
            [status === "" ? Op.ne : Op.eq]: status,
          },
        },
        // raw: true,
        order: [["createdAt", isNew === 1 ? "DESC" : "ASC"]],
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,

        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["url"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["fullName", "phone", "avatar"],
          },
        ],

        // attributes: ["id", "title" "address", "description"], //bao gom cả data đã include ở trên
      });

      // console.log("response", response);

      const count = await db.Post.count({
        where: {
          price: {
            [Op.between]: [priceRangeStart, priceRangeEnd],
          },
          area: {
            [Op.between]: [areaRangeStart, areaRangeEnd],
          },
          province: {
            [Op.substring]: province,
          },
          categoryId: {
            [categoryId === "" ? Op.ne : Op.eq]: categoryId,
          },
          priceRangeId: {
            [priceRangeId === 0 ? Op.is : Op.eq]:
              priceRangeId === 0 ? !null : priceRangeId,
          },
          areaRangeId: {
            [areaRangeId === 0 ? Op.is : Op.eq]:
              areaRangeId === 0 ? !null : areaRangeId,
          },
          status: {
            [status === "" ? Op.ne : Op.eq]: status,
          },
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed at post Service",
        response,
        count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//GET NEW POST
export const getNewPostService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        // raw: true,
        where: { status: "SHOW" },
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]], //order by DESC loc theo kieu giam dan
        limit: +process.env.LIMIT,
        include: [{ model: db.Image, as: "images", attributes: ["url"] }],
        // attributes: ["id", "title", "star", "createdAt"], //bao gom cả data đã include ở trên
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed at post Service",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//CREATE POST
export const createPostService = (body, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.create({
        title: body.title,
        description: body.description,
        price: body.price,
        area: body.area,
        address: body.address,
        province: body.province,
        categoryId: body.categoryId,
        priceRangeId: body.priceRangeId,
        areaRangeId: body.areaRangeId,
        target: body.target,
        userId,
      });
      // console.log(body.images);

      for (let i = 0; i < body.images.length; i++) {
        const image = await db.Image.create({
          url: body.images[i],
          postId: post.id,
        });
      }

      resolve({
        err: 0,
        msg: "Create successfully!",
        post,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//GET POST BY ID
export const getPostByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findByPk(id, {
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["url"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["fullName", "phone"],
          },
          {
            model: db.Category,
            as: "category",
            attributes: ["title"],
          },
        ],
      });
      if (post === null) {
        return resolve({
          err: 1,
          msg: "Post not found!",
          post: null,
        });
      }
      // const r = await post.toObject();
      resolve({
        err: 0,
        msg: "Get successfully!",
        post,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getPostLimitByUserIdService = (page, userId, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;

      const categoryId = +query.categoryId || "";
      const province = query.province || "";
      const priceRangeStart = +query.priceRangeStart || 0;
      const priceRangeEnd = +query.priceRangeEnd || 9999999;
      const areaRangeStart = +query.areaRangeStart || 0;
      const areaRangeEnd = +query.areaRangeEnd || 99999999;
      const priceRangeId = +query.priceRangeId || 0;
      const areaRangeId = +query.areaRangeId || 0;
      const isNew = +query.isNew || 0;

      const response = await db.Post.findAll({
        // logging: true,

        where: {
          price: {
            [Op.between]: [priceRangeStart, priceRangeEnd],
          },
          area: {
            [Op.between]: [areaRangeStart, areaRangeEnd],
          },
          province: {
            [Op.substring]: province,
          },
          categoryId: {
            [categoryId === "" ? Op.ne : Op.eq]: categoryId,
          },
          priceRangeId: {
            [priceRangeId === 0 ? Op.is : Op.eq]:
              priceRangeId === 0 ? !null : priceRangeId,
          },
          areaRangeId: {
            [areaRangeId === 0 ? Op.is : Op.eq]:
              areaRangeId === 0 ? !null : areaRangeId,
          },
          userId: {
            [userId === 1 ? Op.is : Op.eq]: userId === 1 ? !null : userId,
          },
        },
        // raw: true,
        order: [["createdAt", isNew === 1 ? "DESC" : "ASC"]],
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,

        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["url"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["fullName", "phone"],
          },
        ],

        // attributes: ["id", "title" "address", "description"], //bao gom cả data đã include ở trên
      });

      // console.log("response", response);

      const count = await db.Post.count({
        where: {
          price: {
            [Op.between]: [priceRangeStart, priceRangeEnd],
          },
          area: {
            [Op.between]: [areaRangeStart, areaRangeEnd],
          },
          province: {
            [Op.substring]: province,
          },
          categoryId: {
            [categoryId === "" ? Op.ne : Op.eq]: categoryId,
          },
          priceRangeId: {
            [priceRangeId === 0 ? Op.is : Op.eq]:
              priceRangeId === 0 ? !null : priceRangeId,
          },
          areaRangeId: {
            [areaRangeId === 0 ? Op.is : Op.eq]:
              areaRangeId === 0 ? !null : areaRangeId,
          },
          userId: {
            [userId === 1 ? Op.is : Op.eq]: userId === 1 ? !null : userId,
          },
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed at post Service",
        response,
        count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//DELETE POST
export const deletePostService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deleteImages = await db.Image.destroy({
        where: { postId: id },
      });

      const response = await db.Post.destroy({
        where: { id: id },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Deleted" : "No Post to delete",
        response,
        deleteImages,
      });
    } catch (error) {
      reject(error);
    }
  });

//UPDATE POST
export const updatePostService = (data) => {
  // console.log(data.data);
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      const findPost = await db.Post.findOne({
        where: { id: data.id },
      });

      if (!findPost) {
        return resolve({
          err: 1,
          msg: "Post does not exists",
        });
      }

      const updatePost = await db.Post.update(data, {
        where: { id: data.id },
      });

      if (data?.images?.length > 0) {
        const deleteImages = await db.Image.destroy({
          where: { postId: findPost.id },
        });

        // console.log(data?.images);
        if (data?.images) {
          for (let i = 0; i < data?.images.length; i++) {
            const image = await db.Image.create({
              url: data?.images[i],
              postId: findPost.id,
            });
          }
        }
      }

      resolve({
        err: updatePost[0] > 0 ? 0 : 1,
        msg: updatePost[0] > 0 ? "Updated successfully" : "Update failled",
        updatePost,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
