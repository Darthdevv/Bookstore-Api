import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    birthDate: {
      type: Date
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: "Book"
    }],
  },
  {timestamps: true}
);

const Author = mongoose.model("Author", bookSchema);

export default Author;
