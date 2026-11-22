
import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../Models/BlogModel.js";
import Comment from "../Models/CommentModel.js";
import main from "../config/Gemeni.js";

export const AddBlog = async (req, res) => {
    try {
        const {
            title,
            subTitle,
            description,
            category,
            isPublished
        } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Upload image to ImageKit
        const response = await imagekit.files.upload({
            file: fs.createReadStream(imageFile.path),
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimize uploaded image using ImageKit URL transformations
        const optimizedImageURL =
            `${response.url}?tr=q-auto,f-webp,w-1280`;

        const image = optimizedImageURL;

        // Save blog in MongoDB
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished: isPublished === true ||
                         isPublished === "true"
        });

        res.json({
            success: true,
            message: "Blog added successfully"
        });

    } catch (error) {
        console.error("AddBlog Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// controller for getting  complete blog list

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            isPublished: true
        })
        res.json({success: true , blogs})
    } catch (error) {
        console.log("Get All Blogs Error:", error);
        res.json({success: false , msg: error.msg})
    }
}

// indvidual blog data
export const getBlogbyId = async (req, res) => {
    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)

        if(!blog) {
        return res.json({success: false, msg: 'Blog not found'})
    }

    res.json({success: true ,blog})
    } catch (error) {
        res.json({success: false, msg: 'Blog not found'})
    }
}


export const deleteBlogbyId = async (req, res) => {
    try {
        const {id} = req.body
        await Blog.findByIdAndDelete(id)
        // Delete all comments associated with the del blog
        await Comment.deleteMany({blog: id})
        if(!id) {
        return res.json({success: false, msg: 'Blog not found'})
    }

    res.json({success: true , msg: 'Blog deleted successfully'})
    } catch (error) {
        res.json({success: false, msg: error.msg})
    }
}

// method to either publish or unpublish the blog

export const togglePublish = async (req, res) => {
    try {
        const {id} = req.body
        const blog = await Blog.findById(id)

        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true , msg: 'Blog status updated'})

    } catch (error) {
        res.json({success: false, msg: error.message})
    }
}

// for comments APi

export const addComment = async (req, res) => {
    try {
        const {blog, name , content} = req.body
        await Comment.create({blog, name, content})
        res.json({success: true, msg: 'Comment added for review'})
    } catch (error) {
        res.json({success: false, msg: error.msg})
    }

}

// for getting relevant blog comment 

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt:-1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// to generate content

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );
    
    res.json({ success: true, content });

  } catch (error) {
    console.log("AI Controller Error:", error.message);

    res.json({ success: false, message: error.message });
  }
};