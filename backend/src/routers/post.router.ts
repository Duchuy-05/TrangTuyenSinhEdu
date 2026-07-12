import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { upload } from '../middlewares/upload.middleware';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware';
const postRouter: Router = Router();


postRouter.get('/posts', PostController.getAllPostPagination);
postRouter.get('/posts/published', PostController.getAllPublishedPost);
postRouter.get('/posts/:slug', PostController.getBySlug);


postRouter.post('/posts', verifyToken, isAdmin, upload.single('thumbnail'), PostController.createPost);
postRouter.put('/posts/:id', verifyToken, isAdmin, upload.single('thumbnail'), PostController.updatePost);
postRouter.delete('/posts/:id', verifyToken, isAdmin, PostController.deletePost);

export default postRouter;
