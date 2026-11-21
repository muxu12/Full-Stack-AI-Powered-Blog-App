import express from 'express'
import { AddBlog, addComment, deleteBlogbyId, generateContent, getAllBlogs, getBlogbyId, getBlogComments, togglePublish } from '../controllers/BlogController.js';
import upload from '../Middlewares/multer.js';
import auth from '../Middlewares/authentication.js';

const blogRouter = express.Router()

blogRouter.post('/add',upload.single('image'),auth ,AddBlog)
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogbyId)
blogRouter.post('/delete',auth, deleteBlogbyId)
blogRouter.post('/toggle-publish', togglePublish)
blogRouter.post('/add-comment', addComment)
blogRouter.post('/comments', getBlogComments)
blogRouter.post('/generate',auth, generateContent)

export default blogRouter;