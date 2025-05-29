import * as areaRangeService from "../services/areaRangeService";

export const getAreaRanges = async (req, res) => {
  try {
    const response = await areaRangeService.getAreaRangesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at areaRange controller: " + error,
    });
  }
};

export const createAreaRange = async (req, res) => {
  const { title, from, to } = req.body;

  if (!title || !from || !to) {
    return res.status(400).json({
      err: 1,
      msg: "Missing inputs",
    });
  }
  try {
    const response = await areaRangeService.createAreaRangeService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at areaRange controller: " + error,
    });
  }
};

//UPDATE AREARANGE
export const updateAreaRange = async (req, res) => {
  try {
    const response = await areaRangeService.updateAreaRangeService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: 1, msg: error.message });
  }
};

//DELETE AREARANGE
export const deleteAreaRange = async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id);
    const response = await areaRangeService.deleteAreaRangeService({ id });
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at AreaRange controller: " + error,
    });
  }
};

//GET AREARANGE BY ID
export const getAreaRange = async (req, res) => {
  try {
    const response = await areaRangeService.getAreaRangeService(req.params);

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at AreaRange controller: " + error,
    });
  }
};
