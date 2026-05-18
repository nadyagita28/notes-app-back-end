import NoteRepositories from '../notes/repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../exceptions/index.js';
import response from '../../utils/response.js';

export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.body;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
};

export const getAllNotes = async (req, res) => {
  const notes = await NoteRepositories.getAllNotes();
  return response(res, 200, 'success', { notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;

  const note = await NoteRepositories.editNoteById({
    id,
    title,
    body,
    tags,
  });
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', { note });
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deleteNoteById = await NoteRepositories.deleteNoteById(id);

  if (!deleteNoteById) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus');
};
