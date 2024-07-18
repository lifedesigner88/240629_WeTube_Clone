import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    // console.log(res.locals);
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) return next();
    return res.redirect("/login");
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) return next();
    return res.redirect("/");
}

export const avatarsUpload = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 1024 * 1024 * 3
    }
});

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});
