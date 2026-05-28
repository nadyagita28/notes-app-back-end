import NoteRepositories from '../notes/repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../exceptions/index.js';
import response from '../../utils/response.js';
import AuthorizationError from '../../exceptions/authorization-error.js';

export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.validate;
  const { id: owner } = req.user;

  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
    owner,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
};

export const getAllNotes = async (req, res) => {
  const { id: owner } = req.user;
  const notes = await NoteRepositories.getAllNotes(owner);
  return response(res, 200, 'success', { notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteAccess(id, owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validate;

  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteAccess(id, owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

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
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const deleteNoteById = await NoteRepositories.deleteNoteById(id);

  if (!deleteNoteById) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', { deleteNoteById });
};
