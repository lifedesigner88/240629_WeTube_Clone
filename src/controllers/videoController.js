import Video from "../models/Video"
import User from "../models/User";


// Create
export const postUpload = async (req, res) => {

    const {
        user: {
            _id: userId
        },
    } = req.session;

    const {title, description, hashtags} = req.body;
    const video = new Video({
        title,
        owner: userId,
        fileUrl: req.file.path,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    try {
        await video.save();

        const uploadUser = await User.findById(userId);
        uploadUser.videos.push(video._id);
        uploadUser.save();

        return res.redirect("/");
    } catch (e) {
        console.error(e);
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: e._message
        });
    }
}

// Read
export const trending = async (req, res) => {
    try {
        const videos = await Video
            .find({})
            .populate("owner")
            .sort({createAt: "desc"});
        return res.render("home", {
            pageTitle: "Home",
            videos
        })
    } catch (error) {
        return res.render("home", {error: error.message})
    }
}
export const getUpload = (req, res) => {
    return res.render("upload", {
        pageTitle: "Upload Video",
    });
}
export const getEdit = async (req, res) => {
    const {videoId} = req.params;
    const video = await Video.findById(videoId);
    if (!video)
        return res.render("404", {
            pageTitle: " ❌ Video Not Found"
        });
    checkOwner(video, req, res);
    return res.render("edit", {
        pageTitle: `Editing ${video.title} `,
        video
    });
}
export const watch = async (req, res) => {
    const {videoId} = req.params;
    const video = await Video
        .findById(videoId)
        .populate("owner");
    if (!video)
        return res.render("404", {
            pageTitle: " ❌ Video Not Found"
        });
    return res.render("watch", {
        pageTitle: video.title,
        video
    });
}
export const search = async (req, res) => {
    const {keyword} = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            }
        }).populate("owner");
    }
    return res.render("search", {
        pageTitle: "Search",
        videos
    })
}

// Update
export const postEdit = async (req, res) => {
    const {title, description, hashtags} = req.body;
    const {videoId} = req.params;
    const video = await Video.exists({_id: videoId});
    if (!video)
        return res.render("404", {
            pageTitle: " ❌ Video Not Found"
        });
    checkOwner(video, req, res);
    await Video.findByIdAndUpdate(videoId, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${videoId}`)
}

// Delete
export const deleteVideo = async (req, res) => {
    const {videoId} = req.params;
    const video = await Video.findById(videoId);
    if (!video)
        return res.render("404", {
            pageTitle: " ❌ Video Not Found"
        });
    checkOwner(video, req, res);
    await Video.findByIdAndDelete(videoId);
    return res.redirect("/");
}


const checkOwner = (video, req, res) => {
    const userId = req.session.user._id;
    if (String(video.owner) !== String(userId))
        return res.status(403).redirect("/");
}