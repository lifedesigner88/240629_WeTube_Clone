import express from "express";

const handleWatchVideo = (req, res) => {
    return res.send("<h1>Watch Video</h1>");
}

const handleEdit = (req, res) => {
    return res.send("<h1>Edit Video</h1>");
};

// videos

const videoRouter = express.Router();
videoRouter.get('/watch', handleWatchVideo);
videoRouter.get('/edit', handleEdit);
export default videoRouter;
