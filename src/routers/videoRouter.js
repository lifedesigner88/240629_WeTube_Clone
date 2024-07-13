import express from "express";
import {deleteVideo, getEdit, getUpload, postEdit, postUpload, watch} from "../controllers/videoController"
import {protectorMiddleware} from "../middlewares";

// videos
const videoRouter = express.Router();

videoRouter.route('/:videoId([0-9a-f]{24})')
    .get(watch);

videoRouter.route('/:videoId([0-9a-f]{24})/edit')
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);

videoRouter.route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(postUpload);

videoRouter.route('/:videoId([0-9a-f]{24})/delete')
    .all(protectorMiddleware)
    .get(deleteVideo)


export default videoRouter;
