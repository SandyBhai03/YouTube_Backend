import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    channelName: {
        type: String,
        unique: true,
        default: ""
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema);
export default UserModel;