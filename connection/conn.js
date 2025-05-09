import mongoose from "mongoose";

const connectDB =  mongoose.connect('mongodb://localhost:27017/youtube-backend')
.then(() => console.log("DB connection is successful"))
.catch(err => console.log(err));

export default connectDB;