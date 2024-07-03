import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDB from './db/connection.js';
import { globalErrorHandler, notFound } from './middlewares/error.middleware.js';
import authorRoutes from './routes/author.routes.js';
import bookRoutes from './routes/book.routes.js';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use(notFound);
app.use(globalErrorHandler);

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} 📟`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB, server not started 🙍🏻‍♂️", error);
  });