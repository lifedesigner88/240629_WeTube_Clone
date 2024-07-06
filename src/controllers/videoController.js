import Video from "../models/Video"

export const trending = async (req, res) => {
    try {
        const videosObject = await Video.find({});
        return res.render("home", {pageTitle: "Home", videosObject})
    } catch (error) {
        return res.render("home", {error: error.message})
    }
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
export const postEdit = async (req, res) => {
    const {title, description, hashtags} = req.body;
    const {videoId} = req.params;
    const video = await Video.findById(videoId);
    if (!video)
        return res.render("404", {
            pageTitle: " ❌ Video Not Found"
        });
    video.title = title;
    video.description = description;
    video.hashtags = hashtags.split(",")
        .map(word => word.startsWith('#') ? word : `#${word}`)
    await video.save();
    return res.redirect(`/videos/${videoId}`)
}
export const getUpload = (req, res) => {
    return res.render("upload", {
        pageTitle: "Upload Video",
    });
}
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
