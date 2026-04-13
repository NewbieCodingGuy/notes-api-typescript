import { Request, Response } from "express";
import { AppError } from "../types";
import {
  getAllNotes as getAllNotesService,
  createNote as createNoteService,
  getNoteById as getNoteByIdService,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService,
} from "../services/notesService";

const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.user!;
    const notes = await getAllNotesService({ userId });
    res.status(200).json({ message: "All Notes Fetched Successfully", notes });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error("Get Notes Error", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { title, content } = req.body;
    const note = await createNoteService({ userId, title, content });
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error("Create Notes Error", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { userId } = req.user!;
    const note = await getNoteByIdService({ id, userId });
    res.status(200).json({ message: "Note fetched successfully", note });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error("NoteById error", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { userId } = req.user!;
    const { title, content } = req.body;
    const note = await updateNoteService({ id, userId, title, content });
    res.status(200).json({ message: "Note successfully updated!", note });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error("Update Note error", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { userId } = req.user!;
    await deleteNoteService({ id, userId });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error("Delete Note error", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllNotes, createNote, getNoteById, updateNote, deleteNote };
