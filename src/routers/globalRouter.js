import express from "express";
import {join, login, logout} from "../controllers/userController";
import {trending} from "../controllers/videoController";

// "/"
const globalRouter = express.Router();

globalRouter.get('/', trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/logout", logout);

export default globalRouter;



