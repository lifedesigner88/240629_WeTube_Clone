import express from "express";
import {deleteVideo, getEdit, getUpload, postEdit, postUpload, watch} from "../controllers/videoController"

// videos
const videoRouter = express.Router();

videoRouter.route('/:videoId([0-9a-f]{24})')
    .get( watch);

videoRouter.route('/:videoId([0-9a-f]{24})/edit')
    .get(getEdit)
    .post(postEdit);

videoRouter.route("/upload")
    .get(getUpload)
    .post(postUpload);

videoRouter.route('/:videoId([0-9a-f]{24})/delete')
    .get(deleteVideo)


export default videoRouter;
