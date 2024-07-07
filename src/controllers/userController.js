import User from '../models/User';
import {name} from "pug";

export const getJoin = (req, res) => {
    return res.render("join");
}
export const postJoin = async (req, res) => {
    console.log(req.body);
    const {
        name,
        email,
        userName,
        password,
        location
    } = req.body;
    await User.create({
        name,
        email,
        userName,
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