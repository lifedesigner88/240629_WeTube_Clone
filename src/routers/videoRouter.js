import express from "express";
import {deleteVideo, edit, watch, upload} from "../controllers/videoController"


// videos
const videoRouter = express.Router();
videoRouter.get('/upload', upload);
videoRouter.get('/:videoId(\\d+)', watch);
videoRouter.get('/:videoId(\\d+)/edit', edit);
videoRouter.get('/:videoId(\\d+)/delete', deleteVideo);
export default videoRouter;
