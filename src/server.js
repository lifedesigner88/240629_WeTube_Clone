import express from "express";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import morgan from "morgan";

const app = express();

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

app.set("view engine", "pug"); // Html helper
app.set("views", process.cwd() + "/src/views"); // 기본 디렉토리 변경
app.use(logger); // 모든 라우터에서 실행된다.
app.use(privateMiddleware); // 이것도 실행됨

// form 데이터를 제이슨 형테로 번역하는 설정
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true,
    })
)

app.use((req, res, next) => {
    console.log("🍪", req.headers.cookie);
    next();
})
app.use((req, res, next) => {
    req.sessionStore.all((error, session) => {
        console.log(session);
        next();
    })
})

app.get("/add-one", (req, res, next) => {
    req.session.potato +=1;
    return res.send(`${req.session.id} ${req.session.potato}`);
})


// Routher
app.use("/", rootRouter);
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

export default app;



