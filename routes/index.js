import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

// get status and stats
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
// new post by user
router.post('/users', UsersController.postNew);
// authenticate users
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
// post new file
router.post('/files', FilesController.postUpload);
// get and list files
router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);
// file publish and file unpublish
router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);
// file data
router.get('/files/:id/data', FilesController.getFile);

export default router;
