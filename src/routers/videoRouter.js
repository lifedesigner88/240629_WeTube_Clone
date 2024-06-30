import express from "express";

const handleWatchVideo = (req, res) => {
    return res.send("<h1>Watch Video</h1>");
}

// videos
const videoRouter = express.Router();
videoRouter.get('/watch', handleWatchVideo);
export default videoRouter;
