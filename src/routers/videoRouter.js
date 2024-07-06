import express from "express";
import {getEdit, postEdit, watch, getUpload, postUpload} from "../controllers/videoController"

// videos
const videoRouter = express.Router();
videoRouter.get('/:videoId([0-9a-f]{24})', watch);
videoRouter.route('/:videoId([0-9a-f]{24})/edit')
    .get(getEdit)
    .post(postEdit);
videoRouter.route("/upload")
    .get(getUpload)
    .post(postUpload);

export default videoRouter;
