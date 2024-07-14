import express from "express";
import {protectorMiddleware, publicOnlyMiddleware} from "../middlewares"
import {
    finishGithubLogin,
    getChangePassword,
    getEdit,
    logout,
    postChangePassword,
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


userRouter.route('/change-password')
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin)
userRouter.get("/remove", remove);
userRouter.get("/:id", see);
export default userRouter;



