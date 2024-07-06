import Video from "../models/Video"


// Create
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    const video = new Video({
        title,
        description,
        hashtags: hashtags.split(",").map(word => `#${word}`),
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
        const videosObject = await Video.find({});
        return res.render("home", {pageTitle: "Home", videosObject})
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
        hashtags: hashtags.split(",")
            .map(word => word.startsWith('#')
                ? word.trim() : `#${word.trim()}`)
    })
    return res.redirect(`/videos/${videoId}`)
}
