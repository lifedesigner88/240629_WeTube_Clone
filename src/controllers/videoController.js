const fakeUser = {
    username: "Sejong Park",
    loggedIn: true,
}

const videosObject = [

    {
        title: "Video 1",
        rating: 5,
        comments: 2,
        createdAt: "3 minutes ago",
        views: 59,
        id: 1
    },
    {
        title: "Video 2",
        rating: 4,
        comments: 7,
        createdAt: "2 minutes ago",
        views: 1,
        id: 2
    },
    {
        title: "Video 3",
        rating: 2,
        comments: 5,
        createdAt: "1 minutes ago",
        views: 53,
        id: 3
    }
];

export const trending = (req, res) => {
    const videosNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return res.render("home", {
        pageTitle: "Home",
        fakeUser,
        videosNumList,
        videosObject
    });
}
export const watch = (req, res) => {
    const {videoId} = req.params;
    const video = videosObject[videoId - 1];
    return res.render("watch", {
        pageTitle: `Watching ${video.title}`,
        fakeUser,
        video
    });
}
export const edit = (req, res) => {
    return res.render("edit", {
        pageTitle: `Edit User `,
        fakeUser,
    });
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

// https://nomadcoders.co/wetube/lectures/2692