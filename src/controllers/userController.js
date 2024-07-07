import User from '../models/User';
import {name} from "pug";

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

    if(password !== password2)
        return res.render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match"
        })

    if (await User.exists({$or: [{username}, {email}]}))
        return res.render("join", {
            pageTitle,
            errorMessage: "User name or Email already exists"
        });

    await User.create({
        name,
        email,
        username,
        password,
        location
    })
    return res.redirect('/login');
}

export const edit = (req, res) => {
    return res.send("<h1> Edit User </h1>");
}

export const remove = (req, res) => {
    return res.send("<h1> Remove User </h1>");
};

export const login = (req, res) => {
    return res.send("<h1> Login </h1>");
};


export const logout = (req, res) => {
    return res.send("<h1> Logout </h1>");
};

export const see = (req, res) => {
    return res.send("<h1> See </h1>");
};

