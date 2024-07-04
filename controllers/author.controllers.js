import Author from "../models/author.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import appError from "../utils/appError.js"
import Book from "../models/book.model.js";
import APIFeatures from "../utils/apiFeatures.js";


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

export const retreiveAuthors = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Author.find(), req.query)
    .filter()
    .sort()
    .paginate();
  const authors = await features.query;

  if (!authors) {
    return next(new appError("No Authors Found", 404));
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: authors.length,
    data: { authors },
  });
});

export const retreiveAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const author = await Author.findById(id).populate("books");

  if (!author) {
    return next(new appError("Couldn't find this Author", 404));
  }

  res.status(200).json({ author });
});

export const updateAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, bio, birthDate } = req.body;

  if (!name || !bio || !birthDate) {
    return next(new appError("Please fill all fields", 400));
  }

  const books = await Book.find();
  const authorBooks = books.filter((book) => book.author == name);

  if (!authorBooks) {
    return next(new appError("No books found for this author", 404));
  }

  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    {
      name,
      bio,
      birthDate,
      books: authorBooks,
    },
    { new: true }
  );

  if (!updatedAuthor) {
    return next(new appError("failed to update this Author", 400));
  }

  res.status(200).json({ updatedAuthor });
});

export const deleteAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new appError("Author unavailable.", 400));
  }

  await Author.findByIdAndDelete(id);

  res.status(204).json({ message: "Author deleted successfully." });
});



