process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! 💥 shutting down...");
  process.exit(1);
});

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
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use(notFound);
app.use(globalErrorHandler);

connectToMongoDB();
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} 📟`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  })
});