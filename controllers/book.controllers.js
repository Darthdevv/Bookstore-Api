import Book from "../models/book.model.js";
import appError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createBook = catchAsync(async (req, res, next) => {
  const { title, content, author, publishedDate } = req.body;

  if (!title || !content || !author || !publishedDate) {
    return next(new appError('Please fill all fields', 400));
  }

  const book = await Book.create({
    title,
    content,
    author,
    publishedDate
  });

  if (!book) {
    return next(new appError('failed to publish book'));
  }

  res.status(201).json({message: 'success', data: book});
});

export const retreiveBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();

  if (!books) {
    return next(new appError('No Books Found.', 404));
  }

  res.status(200).json({ books });
});

export const retreiveBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return next(new appError("Couldn't find this Book.", 404));
  }

  res.status(200).json({ book });
});

export const updateBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { title, content, author, publishedDate } = req.body;

  if (!title || !content || !author || !publishedDate) {
    return next(new appError("Please fill all fields.", 400));
  }

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    {
      title,
      content,
      author,
      publishedDate
    },
    { new: true }
  );

  if (!updatedBook) {
    return next(new appError("failed to update this Book", 400));
  }

  res.status(200).json({ updatedBook });
});

export const deleteBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new appError("Book unavailable.", 400));
  }

  await Book.findByIdAndDelete(id);

  res.status(204).json({ message: "Book deleted successfully." });
});
