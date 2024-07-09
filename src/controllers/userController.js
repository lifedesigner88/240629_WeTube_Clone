import User from '../models/User';
import {name} from "pug";
import bcrypt from "bcrypt";

// Join
export const getJoin = (req, res) => {
    return res.render("join");
}
export const postJoin = async (req, res) => {
    const pageTitle = "join"

    const {
        name,
        email,
        username,
        password,
        password2,
        location
    } = req.body;

    if (password !== password2)
        return res.status(404).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match"
        })

    if (await User.exists({$or: [{username}, {email}]}))
        return res.status(404).render("join", {
            pageTitle,
            errorMessage: "User name or Email already exists"
        });

    try {
        await User.create({
            name,
            email,
            username,
            password,
            location
        })
        return res.redirect('/login');
    } catch (e) {
        return res.status(404).render("join", {
            pageTitle,
            errorMessage: e._message
        });
    }
}

// Login
export const getLogin = (req, res) => {
    return res.render("login", {pageTitle: "Login"});
};
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(!user)
        return res.status(400).render("login", {
            pageTitle: "Login", errorMessage: "username Does not exists"
        });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "Wrong password",
        })

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};


export const logout = (req, res) => {
    req.session.loggedIn = false;
    return res.redirect("/");
};
export const see = (req, res) => {
    return res.send("<h1> See </h1>");
};

// Update
export const edit = (req, res) => {
    return res.send("<h1> Edit User </h1>");
}

// Delete
export const remove = (req, res) => {
    return res.send("<h1> Remove User </h1>");
};


// https://nomadcoders.co/wetube/lectures/2711