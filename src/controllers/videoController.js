export const trending = (req, res) => {
    return res.render("home");
}
export const see = (req, res) => {
        console.log(req.params);
    return res.send("<h1> Watch Videos </h1>");
}
export const edit = (req, res) => {
    console.log(req.params);
    return res.send("<h1> Edit Videos </h1>");
}

export const search = (req, res) => {
    return res.send("<h1> Search Videos</h1>");
}

export const upload = (req, res) => {
    return res.send("<h1> upLoad Videos </h1>");
}

export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("<h1> delete Videos </h1>");
}

