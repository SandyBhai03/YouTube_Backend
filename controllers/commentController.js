import Comment from "../models/comment.js";

// ---------- add a comment function(for login user only) --------------
export const addComment = async (req, res) => {
  try {
    let { video, message } = req.body;
    console.log(video, message);
    const comment = new Comment({ user: req.user._id, video, message })
    await comment.save();

    res.status(201).json({ message: "Success", comment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//-------------- find comment by video ID ------------
export const getCommentByVideoId = async (req, res) => {
  try {
    let { videoId } = req.params;

    const comments = await Comment.find({ video: videoId }).populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(201).json({ message: "Success", comments });
    //console.log(comments[0].message)

  } catch (error) {
    console.error("Error fetching comments:", error.message); // for debugging
    res.status(500).json({ error: "Server error" });
  }
}
