import express from "express";
import {getEdit, postEdit, upload, watch} from "../controllers/videoController"


// videos
const videoRouter = express.Router();
videoRouter.get('/upload', upload);
videoRouter.get('/:videoId(\\d+)', watch);
videoRouter.get('/:videoId(\\d+)/edit', getEdit);
videoRouter.post('/:videoId(\\d+)/edit', postEdit);
export default videoRouter;
