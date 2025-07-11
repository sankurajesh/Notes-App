import express from 'express';
import { login, refreshToken, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addNote, allNotes } from '../controllers/notes.controller';

const router = express.Router(); // ✅ Express router instance

router.post('/register', register); // ✅ attach controller
router.post('/login', login); // ✅ attach controller
router.post('/refreshToken', refreshToken); // ✅ attach controller
router.post('/notes', authMiddleware, addNote);
router.get('/allNotes', authMiddleware, allNotes);

export default router; // ✅ must export the router
