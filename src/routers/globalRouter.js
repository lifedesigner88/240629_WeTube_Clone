import express from "express";

const handleHome = (req, res) => {
    return res.send("<h1>Home Page</h1>");
}

const handleJoin = (req, res) => {
    return res.send("<h1>Join</h1>");
}

// "/"
const globalRouter = express.Router();
globalRouter.get('/', handleHome);
globalRouter.get("/join", handleJoin);
export default globalRouter;



