import express from 'express';
import { addComment, getCommentByVideoId } from '../controllers/commentController.js';
import { auth } from '../middleware/authentication.js';

const router = express.Router();


router.post('/comment', auth, addComment);
router.get('/comment/:videoId', getCommentByVideoId);

export default router;