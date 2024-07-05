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
export const postUpload = (req, res) => {
    const {title} = req.body;
    return res.redirect("/");
}
