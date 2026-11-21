import jwt from 'jsonwebtoken'
import Blog from '../Models/BlogModel.js';
import Comment from '../Models/CommentModel.js';

export const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if(email != process.env.Admin_Email || password != process.env.Admin_Password) {
            return res.json({success : false , message: 'Invalid Credentials'})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})

    } catch (error) {
        res.json({success: false, message: error.message})        
    }
}

// create blog list for admin to get all blog wether they are publish or not 

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        res.json({success: true, blogs})

    } catch (error) {
        res.json({success: false, message: error.message}) 
    }
}

// admin can see all the comments also 

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
        res.json({success: true , comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// admin get dashboard data

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5)
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished: false})

        const dashboard = {
            blogs, comments, drafts, recentBlogs
        }

        res.json({success: true, dashboard})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// admin can delete   

export const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body
        await Comment.findByIdAndDelete(id)
        res.json({success: true, message: 'Comment deleted successfully'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }    
}

//approve the comments

export const approveCommentbyId = async (req, res) => {
    try {
        const {id} = req.body
        await Comment.findByIdAndUpdate(id, {isApproved: true})
        res.json({success: true, msg: 'Comment approved successfully'})
    } catch (error) {
        res.json({success: false, msg: error.msg})
    }
}

