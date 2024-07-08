import express from "express";
import {getJoin, getLogin, logout, postJoin, postLogin} from "../controllers/userController";
import {search, trending} from "../controllers/videoController";

// "/"
const rootRouter = express.Router();

rootRouter.get('/', trending);

rootRouter.route("/join")
    .get(getJoin)
    .post(postJoin);

rootRouter.route("/login")
    .get(getLogin)
    .post(postLogin);

rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;
