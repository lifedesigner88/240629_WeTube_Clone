import express from "express";
import {getJoin, postJoin, login, logout} from "../controllers/userController";
import {search, trending} from "../controllers/videoController";

// "/"
const rootRouter = express.Router();

rootRouter.get('/', trending);
rootRouter.route("/join")
    .get(getJoin)
    .post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;



