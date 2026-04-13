import express from "express";
import {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notesController";
import verifyToken from "../middlewares/verifyToken";
import { validate } from "../middlewares/validate";
import { noteRules } from "../middlewares/notesValidation";

const router = express.Router();

router.get("/notes", verifyToken, getAllNotes);

router.post("/notes", verifyToken, validate(noteRules), createNote);

router.get("/notes/:id", verifyToken, getNoteById);

router.put("/notes/:id", verifyToken, validate(noteRules), updateNote);

router.delete("/notes/:id", verifyToken, deleteNote);

export  {router};
