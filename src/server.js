require('dotenv').config()

import express from "express";
import session from "express-session";
import morgan from "morgan";
import {localsMiddleware} from "./middlewares";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

const loggerMiddleware = morgan("dev"); // 컬러풀한 로그 찍어줌
app.use(loggerMiddleware);

const logger = (req, res, next) => {
    next();
}
const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if (url === "/protected")
        return res.send("<h1> Private Page </h1>");
    next();
}
const handleProtected = (req, res) => {
    console.log("I'm in the protected route!");
    return res.send("<h1> Protected Page </h1>");
}

app.set("view engine", "pug"); // Html helper
app.set("views", process.cwd() + "/src/views"); // 기본 디렉토리 변경
app.use(logger); // 모든 라우터에서 실행된다.
app.use(privateMiddleware); // 이것도 실행됨

// form 데이터를 제이슨 형테로 번역하는 설정
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false, // 로그인 할때만 세션발급 (false)
        cookie: {
            maxAge: 30 * 60 * 60 * 1000
        },
        store: MongoStore
            .create({mongoUrl: process.env.MONGODB_URI})
    })
)
app.use(localsMiddleware);

// Routher
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/uploads", express.static("uploads"));
app.get("/protected", handleProtected) // privateMiddleware 때문에 도달 불가


const handleLogin = (req, res) => {
    return res.send({
        message: "Login Here"
    });
}
app.get("/login", handleLogin);

export default app;