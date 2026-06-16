import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { upload } from '../middlerwares/upload.middleware';
const postRouter: Router = Router();


postRouter.get('/posts', PostController.getAllPost);
postRouter.get('/posts/published', PostController.getAllPulishedPost);
postRouter.get('/posts/:slug', PostController.getBySlug);


postRouter.post('/posts', upload.single('thumbnail'), PostController.createPost);
postRouter.put('/posts/:id', upload.single('thumbnail'), PostController.updatePost);
postRouter.delete('/posts/:id', PostController.deletePost);

export default postRouter;