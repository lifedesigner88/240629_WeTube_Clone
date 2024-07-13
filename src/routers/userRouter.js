import express from "express";
import {protectorMiddleware, publicOnlyMiddleware} from "../middlewares"
import {
    finishGithubLogin,
    getEdit,
    logout,
    postEdit,
    remove,
    see,
    startGithubLogin
} from "../controllers/UserController";


// users
const userRouter = express.Router();
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route('/edit')
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin)
userRouter.get("/:id", see);
userRouter.get("/remove", remove);
export default userRouter;



