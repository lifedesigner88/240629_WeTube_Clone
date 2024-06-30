import express from "express";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;
const app = express();


import morgan from "morgan";
const loggerMiddleware = morgan("dev"); // 컬러풀한 로그 찍어줌
app.use(loggerMiddleware);

const logger = (req, res, next) => {
    // console.log(`I'm in the middle! : ${req.method} ${req.url}`);
    next();
}


const privateMiddleware = (req, res, next) => {
    // console.log("protected Middleware");
    const url = req.url;
    if (url === "/protected")
        return res.send("<h1> Private Page </h1>");
    next();
}
const handleProtected = (req, res) => {
    console.log("I'm in the protected route!");
    return res.send("<h1> Protected Page </h1>");
}

app.use(logger); // 모든 라우터에서 실행된다.
app.use(privateMiddleware); // 이것도 실행됨


// Routher

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);



// app.get("/", handleHome);
app.get("/protected", handleProtected) // privateMiddleware 때문에 도달 불가


const handleLogin = (req, res) => {
    return res.send({
        message: "Login Here"
    });
}
app.get("/login", handleLogin);


const handleListening = () =>
    console.log(` ✅  Server Listenting on Port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);


