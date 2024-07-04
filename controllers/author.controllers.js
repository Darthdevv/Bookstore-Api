import Author from "../models/author.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import appError from "../utils/appError.js"
import Book from "../models/book.model.js";


export const createAuthor = catchAsync(async (req, res, next) => {
  const { name, bio, birthDate } = req.body;

  if (!name || !bio || !birthDate) {
    return next(new appError('Please fill all fields', 400));
  }

  const books = await Book.find();
  const authorBooks = books.filter(book => book.author == name);

  if (!authorBooks) {
    return next(new appError('No books found for this author', 404));
  }

  const author = await Author.create({
    name,
    bio,
    birthDate,
    books: authorBooks
  });

  if (!author) {
    return next(new appError("failed to add this author", 400));
  }

  res.status(201).json({ message: "success", data: author });
});

export const retreiveAuthors = catchAsync(async (req, res, next) => {});

export const retreiveAuthor = catchAsync(async (req, res, next) => {});

export const updateAuthor = catchAsync(async (req, res, next) => {});

export const deleteAuthor = catchAsync(async (req, res, next) => {});



