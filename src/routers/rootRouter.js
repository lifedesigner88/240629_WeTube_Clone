import express from "express";
import {getJoin, getLogin, logout, postJoin, postLogin} from "../controllers/userController";
import {search, trending} from "../controllers/videoController";
import {publicOnlyMiddleware} from "../middlewares";

// "/"
const rootRouter = express.Router();

rootRouter.get('/', trending);

rootRouter.route("/join")
    .all(publicOnlyMiddleware)
    .get(getJoin)
    .post(postJoin);

rootRouter.route("/login")
    .all(publicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin);

rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;
