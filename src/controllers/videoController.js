const fakeUser = {
    username: "Sejong Park",
    loggedIn: true,
}

export const trending = (req, res) => {
    const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return res.render("home", {
        pageTitle: "Home",
        fakeUser,
        videos
    });
}
export const see = (req, res) => {
    return res.render("watch");
}
export const edit = (req, res) => {
    return res.render("edit");
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

