import { Router } from "express";
import { createBook, deleteBook, retreiveBook, retreiveBooks, updateBook } from "../controllers/book.controllers.js";

const router = Router();

router.route("/").post(createBook).get(retreiveBooks);
router
  .route("/:id")
  .get(retreiveBook)
  .patch(updateBook)
  .delete(deleteBook);

export default router;
