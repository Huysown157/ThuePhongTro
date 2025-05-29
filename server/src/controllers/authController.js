import * as authService from "../services/authService";
import APIError from "../utils/apiError";

export const register = async (req, res) => {
  const { fullName, phone, email, password } = req.body;
  try {
    if (!fullName || !phone || !email || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    }
    const response = await authService.registerService(req.body);
    // console.log(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const login = async (req, res) => {
  const { fullName, phone, password } = req.body;
  try {
    if (!phone || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    }
    const response = await authService.loginService(req.body);
    // console.log(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: error.message,
    });
  }
};
