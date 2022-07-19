import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "User not found!" });
    }

    return res.status(StatusCodes.OK).send({ user });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};
