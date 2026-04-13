import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../config/db";
import { AppError } from "../types";
import { Note } from "../types";

const getAllNotes = async ({ userId }: { userId: number }): Promise<Note[]> => {
  const [notes] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM notes WHERE user_id=?",
    [userId],
  );

  return notes as Note[];
};

const createNote = async ({
  userId,
  title,
  content,
}: {
  userId: number;
  title: string;
  content: string;
}): Promise<Note> => {
  const [note] = await pool.execute<ResultSetHeader>(
    "INSERT INTO notes (user_id, title, content) VALUES(?,?,?)",
    [userId, title, content],
  );

  if (!note.insertId) {
    throw new AppError("Note creation failed", 500);
  }

  return {
    id: note.insertId,
    user_id:userId,
    title,
    content,
  };
};

const getNoteById = async ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}): Promise<Note> => {
  const [note] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM notes WHERE id = ? AND user_id = ?",
    [id, userId],
  );

  if (note.length === 0) {
    throw new AppError("No note exist with this id!", 404);
  }

  return note[0] as Note;
};

const updateNote = async ({
  id,
  userId,
  title,
  content,
}: {
  id: number;
  userId: number;
  title: string;
  content: string;
}): Promise<Note> => {
  const [note] = await pool.execute<ResultSetHeader>(
    "UPDATE notes SET title=?, content=? WHERE id=? AND user_id=?",
    [title, content, id, userId],
  );

  if (note.affectedRows === 0) {
    throw new AppError("No Note found", 404);
  }

  return {
    id,
    user_id:userId,
    title,
    content
  }
};

const deleteNote = async ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}): Promise<void> => {
  const [note] = await pool.execute<ResultSetHeader>(
    "DELETE FROM notes WHERE id=? AND user_id=?",
    [id, userId],
  );

  if (note.affectedRows === 0) {
    throw new AppError("No note found", 404);
  }
};

export { getAllNotes, createNote, getNoteById, updateNote, deleteNote };
