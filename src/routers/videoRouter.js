import express from "express";
import {getEdit, postEdit, watch, getUpload, postUpload} from "../controllers/videoController"


// videos
const videoRouter = express.Router();
videoRouter.get('/:videoId(\\d+)', watch);
videoRouter.route('/:videoId(\\d+)/edit')
    .get(getEdit)
    .post(postEdit);
videoRouter.route("/upload")
    .get(getUpload)
    .post(postUpload);

export default videoRouter;
