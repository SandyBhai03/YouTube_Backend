import Video from "../models/video.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail, category } = req.body;
    console.log(req.user);
    const videoUpload = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
      category
    });
    await videoUpload.save(); // saved in database

    res.status(201).json({ sucess: "true", videoUpload });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ------- get all video display for all users (not signUp/login required ) -------
export const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(201).json({ success: "true", videos: videos });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------- GET Video by Id -------------

export const getVideoById = async (req, res) => {
  try {
    let { id } = req.params;
    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    if (!video) return res.status(404).json({ error: "video not found" });

    res.status(201).json({ success: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------- admin/channel owner videos showing for all users who visit the channel ---------
// ~~~~~~~~~~~ all channel videos ( sign/login not required ) ~~~~~~~

export const getAllVideoByUserId = async (req, res) => {
  try {
    let { userId } = req.params;
    const videos = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName about createdAt"
    );
    if (!videos) {
      return res.status(404).json({ error: "video not found" });
    }
    res.status(201).json({ success: "true", videos: videos });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ---------- UPDATE VIDEO VIEWS ----------
// PUT /api/video/:id/view
export const incrementViews = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1000 } },  // increment views by 1
      { new: true }
    );

    if (!video) return res.status(404).json({ error: "Video not found" });

    res.status(200).json({ success: true, views: video.views });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// -------- Search Videos Functinality--------
export const searchVideos = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // 'i' for case-insensitive
    const results = await Video.find({
      $or: [
        { title: { $regex: regex } },
        { category: { $regex: regex } },
        { videoType: { $regex: regex } },
      ],
    }).populate("user", "channelName profilePic userName createdAt");

    res.status(200).json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};