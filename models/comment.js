import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{timestamps:true})

const commentModel = mongoose.model('Comment', commentSchema);
export default commentModel;
