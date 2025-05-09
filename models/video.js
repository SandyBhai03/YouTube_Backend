import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoLink: {
      type: String,
      required: true,
    },
    videoType: {
      type: String,
      default: "All",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Entertainment",
    },
    like: {
      type: Number,
      default: 1230,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
