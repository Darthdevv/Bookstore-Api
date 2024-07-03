import { Router } from "express";
import { createAuthor, deleteAuthor, retreiveAuthor, retreiveAuthors, updateAuthor } from "../controllers/author.controllers.js";

const router = Router();

router.route("/").post(createAuthor).get(retreiveAuthors);
router
  .route("/:id")
  .get(retreiveAuthor)
  .patch(updateAuthor)
  .delete(deleteAuthor);

export default router;