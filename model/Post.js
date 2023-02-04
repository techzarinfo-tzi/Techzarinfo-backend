const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        message: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model("tempPost", postSchema);
    
module.exports = Post;