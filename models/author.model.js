import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({});

const Author = mongoose.model("Author", bookSchema);

export default Author;
