import db from "../models";
import APIError from "../utils/apiError";

//GET ALL CATEGORY

export const getCategoriesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
      }); //bình thường trả ve instance chứa data và một vài thông số khác. Nhưng có raw:true thì trả về data{}
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get categories.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//CREATE CATEGORY
export const createCategoryService = ({ title, header, subheader }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOrCreate({
        where: {
          title,
        },
        defaults: {
          title,
          header,
          subheader,
        },
      });
      // console.log(response);
      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Create successfully!" : "Category already exist!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//UPDATE CATEGORY
export const updateCategoryService = ({ id, title, header, subheader }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.update(
        {
          title,
          header,
          subheader,
        },
        {
          where: {
            id,
          },
        }
      );
      // console.log(response);

      // if (!response[0]) {
      //   return reject(new APIError(404, "Cannot update!"));
      // }

      resolve({
        err: response[0] ? 0 : 1,
        msg: response[0] ? "Update successfully!" : "Category not found!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//DELETE CATEGORY
export const deleteCategoryService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.destroy({
        where: {
          id,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Delete successfully!" : "Category not found!",
        response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

//GET CATEGORY BY ID
export const getCategoryService = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOne({
        where: {
          id,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get successfully!" : "Category not found!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// //GET CATE BY POST ID
// export const getCategoryByPostIdService = ({ postId }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const category = await db.Category.findOne({
//         where: {
//           postId,
//         },
//       });

//       if (!category) {
//         reject({
//           err: 1,
//           msg: "Category not found!",
//           category: null,
//         });
//       }
//       resolve({
//         err: 0,
//         msg: "Get category successfuly!",
//         category,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
