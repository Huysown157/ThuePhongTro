import * as categoryService from "../services/categoryService";
import APIError from "../utils/apiError";

export const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategoriesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at caterogy controller" + error,
    });
  }
};

//CREATE CATEGORY
export const createCategory = async (req, res) => {
  const { title, header, subheader } = req.body;

  // console.log(req.body);
  try {
    if (!title || !header || !subheader) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs!",
      });
    }

    const response = await categoryService.createCategoryService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at category controller: " + error,
    });
  }
};

//UPDATE CATEGORY
export const updateCategory = async (req, res, next) => {
  try {
    const response = await categoryService.updateCategoryService(req.body);

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at category controller: " + error,
    });
  }
};

//DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const response = await categoryService.deleteCategoryService(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at category controller: " + error,
    });
  }
};

//GET CATEGORY  BY ID
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await categoryService.getCategoryService({ id });
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at category controller: " + error,
    });
  }
};

// //GET CATEGORY BY POST ID
// export const getCategoryByPostId = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     if (!postId) {
//       return res.status(400).json({
//         err: 1,
//         msg: "Missing post id",
//       });
//     }

//     const reponse = await categoryService.getCategoryByPostIdService(postId);

//     res.status(200).json(reponse);
//   } catch (error) {
//     return res.status(500).json({
//       err: -1,
//       msg: "Fail at category controller: " + error,
//     });
//   }
// };
