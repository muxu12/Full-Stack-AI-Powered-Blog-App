import express from 'express'
import { adminLogin, approveCommentbyId, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/AdminController.js';
import auth from '../Middlewares/authentication.js';

const adminRouter = express.Router()
adminRouter.post('/login', adminLogin)
adminRouter.get('/comments',auth, getAllComments)
adminRouter.get('/blogs',auth, getAllBlogsAdmin)
adminRouter.post('/delete-comments',auth, deleteCommentById)
adminRouter.post('/approve-comments',auth, approveCommentbyId)
adminRouter.get('/dashboard', auth, getDashboard)

export default adminRouter;