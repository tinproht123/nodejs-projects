import { StatusCodes } from "http-status-codes";
import Book from "../models/Book.js";

//global
export const getAllBooks = async (req, res) => {
  const results = await Book.find().sort("bookName");
  return res.status(StatusCodes.OK).send({ results });
};

export const createBook = async (req, res) => {
  try {
    const isBookNameExist = await Book.exists({ bookName: req.body.bookName });
    if (isBookNameExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Book has already exist" });
    }
    const book = await Book.create(req.body);
    return res.status(StatusCodes.CREATED).send({ book });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};

//specificed id
export const getBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: `Not found book with id ${bookId}` });
    }

    return res.status(StatusCodes.OK).send({ book });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findOneAndDelete({ _id: bookId });

  if (!book) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: `Not found book with id ${bookId}` });
  }

  return res.status(StatusCodes.OK).send({ book });
};

export const updateBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
    new: true,
  });

  if (!book) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: `Not found book with id ${bookId}` });
  }

  return res.status(StatusCodes.OK).send({ book });
};
