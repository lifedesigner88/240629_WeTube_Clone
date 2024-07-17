import Video from "../models/Video"


// Create
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    console.log("❤️", req.file);
    const video = new Video({
        title,
        fileUrl: req.file.path,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    try {
        await video.save();
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
        const videos = await Video.find({}).sort({createAt: "desc"});
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
    return res.render("edit", {
        pageTitle: `Editing ${video.title} `,
        video
    });
}
export const watch = async (req, res) => {
    const {videoId} = req.params;
    const video = await Video.findById(videoId);
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
        });
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
    await Video.findByIdAndDelete(videoId);
    return res.redirect("/");
}