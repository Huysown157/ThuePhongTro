import express from 'express'
import * as postController from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)
router.get('/user-posts', verifyToken, postController.getPostsByUser)

router.post('/create', postController.createPost)
router.put('/:id', verifyToken, postController.updatePost)
router.delete('/:id', verifyToken, postController.deletePost)

export default router