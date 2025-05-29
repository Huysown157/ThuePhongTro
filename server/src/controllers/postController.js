import * as postService from "../services/postService";

export const getPost = async (req, res) => {
  try {
    const response = await postService.getPostsService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post Controller",
    });
  }
};

export const getPostLimit = async (req, res) => {
  const { page, ...query } = req.query;
  // console.log(query);
  try {
    const response = await postService.getPostsLimitService(page, query);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Failed at post Controller",
    });
  }
};

//GET POST BY ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing post id",
      });
    }
    const response = await postService.getPostByIdService(id);
    if (response.post === null) {
      return res.status(404).json({
        err: 2,
        msg: "Post not found",
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post Controller",
      error,
    });
  }
};

//GET ALL POST BY USER ID
export const getPostLimitByUserId = async (req, res) => {
  const { id } = req.user;
  const { page, ...query } = req.query;
  // console.log(query);
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing id user",
      });
    const response = await postService.getPostLimitByUserIdService(
      page,
      id,
      query
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Failed at post Controller",
    });
  }
};

export const getNewPost = async (req, res) => {
  try {
    const response = await postService.getNewPostService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post Controller::" + error,
    });
  }
};

//CREATE POST
export const createPost = async (req, res) => {
  const { id } = req.user;
  const { categoryId, title, price, area, address } = req.body;

  // console.log(req.body);

  if (!categoryId || !id || !title || !price || !area || !address) {
    return res.status(400).json({
      err: 1,
      msg: "Missing inputs",
    });
  }
  try {
    const response = await postService.createPostService(req.body, id);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Failed at post Controller::" + error,
    });
  }
};

//DELETE POST
export const deletePost = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;
  // console.log(req.body);

  try {
    if (!userId || !id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    }

    const response = await postService.deletePostService(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: ",
      error,
    });
  }
};

//UPDATE POST
export const updatePost = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  try {
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    }

    const response = await postService.updatePostService(req.body);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: ",
    });
  }
};
