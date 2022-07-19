import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const isUsernameExist = await User.exists({ username: req.body.username });
    const isEmailExist = await User.exists({ email: req.body.email });
    if (isUsernameExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Username has already exist" });
    }

    if (isEmailExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Email has already exist" });
    }

    const user = await User.create({ ...req.body });
    return res.status(StatusCodes.OK).send({ user });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Please provide username or password" });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Username not exist!" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Password incorrected!" });
    }
    const accessToken = user.createAccessToken();

    res.cookie("username", username);

    return res.status(StatusCodes.OK).json({ user, accessToken });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie();
  return res.send({ message: "Logged out!" });
};
