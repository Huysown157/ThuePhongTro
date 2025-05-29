import * as priceRangeService from "../services/priceRangeService";

export const getPriceRanges = async (req, res) => {
  try {
    const response = await priceRangeService.getPriceRangesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at areaRange controller: " + error,
    });
  }
};

export const createPriceRange = async (req, res) => {
  const { title, from, to } = req.body;

  if (!title || !from || !to) {
    return res.status(400).json({
      err: 1,
      msg: "Missing inputs",
    });
  }
  try {
    const response = await priceRangeService.createPriceRangeService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at areaRange controller: " + error,
    });
  }
};

//UPDATE AREARANGE
export const updatePriceRange = async (req, res) => {
  try {
    const response = await priceRangeService.updatePriceRangeService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: 1, msg: error.message });
  }
};

//DELETE AREARANGE
export const deletePriceRange = async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id);
    const response = await priceRangeService.deletePriceRangeService({ id });
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at PriceRange controller: " + error,
    });
  }
};

//GET AREARANGE BY ID
export const getPriceRange = async (req, res) => {
  try {
    const response = await priceRangeService.getPriceRangeService(req.params);

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at PriceRange controller: " + error,
    });
  }
};
