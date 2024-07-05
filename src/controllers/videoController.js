import Video from "../models/Video"

export const trending = async (req, res) => {
    try {
        const videosObject = await Video.find({});
        return res.render("home", {pageTitle: "Home", videosObject})
    } catch (error) {
        return res.render("home", {error: error.message})
    }
}
export const watch = (req, res) => {
    const {videoId} = req.params;
    return res.render("watch", {
        pageTitle: `Wathing `,
    });
}
export const getEdit = (req, res) => {
    const {videoId} = req.params;
    return res.render("edit", {
        pageTitle: `Editing `,
    });
}
export const postEdit = (req, res) => {
    const {videoId} = req.params;
    const {title} = req.body;
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
        createAt: Date.now(),
        hashtags: hashtags.split(",").map(word => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
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
