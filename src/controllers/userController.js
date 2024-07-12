import User from '../models/User';
import {name} from "pug";
import bcrypt from "bcrypt";
import * as console from "node:console";
import req from "express/lib/request";
import res from "express/lib/response";

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
    if (!user)
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

require('dotenv').config()

// AOuth
export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        allow_signup: true,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const githubLoginUrl = `${baseUrl}?${params}`;
    return res.redirect(githubLoginUrl);
}

export const finishGithubLogin = async (req, res) => {

    const {code} = req.query;

    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
    };

    const params = new URLSearchParams(config).toString();

    try {
        // 1️⃣ Access Token 요청
        const accessTokenUrl = `${baseUrl}?${params}`;
        const response = await fetch(accessTokenUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            }
        });
        const data = await response.json();
        const access_token = data.access_token;

        // 2️⃣ Access Token 으로 유저 정보 요청
        const apiUrl = "https://api.github.com";
        const userData = await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });
        const userJson = await userData.json();
        console.log("😊", userJson);

        // 3️⃣ Access Token 으로 email 정보 요청
        const emailData = await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });
        const emailJson = await emailData.json();
        console.log("📨", emailJson);

        // 4️⃣ email 의 소유자가 검증된 이메일 추출
        const emailObj = emailJson
            .find(email =>
                email.primary === true &&
                email.verified === true
            );
        if (!emailObj) return res.redirect("/login");

        // 5️⃣ 검증된 이메일이 등록된 이메일이라면 로그인하고 없으면 계정 생성
        const existingUser = await User.findOne({ email: emailObj.email });
        console.log("❤️",existingUser);
        if (existingUser) {
            req.session.loggedIn = true;
            req.session.user = existingUser;
            return res.redirect("/");
        } else {
            const newUser = await User.create({
                email: emailObj.email,
                username: userJson.login,
                password: "",
                socialOnly: true,
                name: userJson.name,
                location: userJson.location,
            });
            req.session.loggedIn = true;
            req.session.user = newUser;
            return res.redirect("/");
        }

    } catch (error) {
        console.log("Github OAuth Error", error);
        return res.redirect("/login")
    }
}