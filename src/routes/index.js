import { Router } from 'express';
import notes from '../services/notes/index.js';

const router = Router();

router.use('/', notes);

export default router;
