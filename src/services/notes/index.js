import express from 'express';
import {
  createNote,
  deleteNoteById,
  editNoteById,
  getAllNotes,
  getNoteById,
} from '../controller/note-controller.js';
import { validate } from '../../middlewares/validate.js';
import { notePayloadSchema } from './validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;
