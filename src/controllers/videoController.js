const fakeUser = {
    username: "Sejong Park",
    loggedIn: false,
}

export const trending = (req, res) => {
    return res.render("home", {
        pageTitle: "Home",
        fakeUser
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

