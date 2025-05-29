import favoriteService from "../services/favoriteService";

const favoriteController = {
  getAllByUserId: async (req, res) => {
    const { userId } = req.query;
    try {
      const response = await favoriteService.getAllByUserId(userId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Fail at Favorite controller" + error,
      });
    }
  },

  remove: async (req, res) => {
    const { userId, postId } = req.query;
    try {
      const response = await favoriteService.remove(userId, postId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Fail at Favorite controller" + error,
      });
    }
  },

  create: async (req, res) => {
    const { userId, postId } = req.body;
    try {
      const response = await favoriteService.create(userId, postId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Fail at Favorite controller" + error,
      });
    }
  },
};

export default favoriteController;
