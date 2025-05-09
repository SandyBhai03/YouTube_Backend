import express from 'express';
import { uploadVideo, getAllVideo, getVideoById,  getAllVideoByUserId,searchVideos, incrementViews } from '../controllers/videoController.js';
import { auth } from '../middleware/authentication.js'; // for authentication (middleware)


const router = express.Router(); // create instance

router.post('/video', auth, uploadVideo);
router.get('/allVideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId) // show all any channel videos for all users

// search videos route
router.get('/search/videos', searchVideos);

// PUT /api/video/:id/view
router.put('/video/:id/view', incrementViews);

export default router;
