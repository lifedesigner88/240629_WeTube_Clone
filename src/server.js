import express from "express";
import * as url from "node:url";
import res from "express/lib/response";
import * as console from "node:console";

const PORT = 4000;


const app = express();

const logger = (req, res, next) => {
    console.log(`I'm in the middle! : ${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    console.log("protected Middleware");
    const url = req.url;
    if (url === "/protected")
        return res.send("<h1> Private Page </h1>");
    next();
}



const handleHome = (req, res) => {
    console.log("I'm in the end!!!");
    return res.end();
}
const handleProtected = (req, res) => {
    console.log("I'm in the protected route!");
    return res.send("<h1> Protected Page </h1>");
}


app.use(logger); // 모든 라우터에서 실행된다.
app.use(privateMiddleware); // 이것도 실행됨

app.get("/", handleHome);
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



// https://nomadcoders.co/wetube/lectures/2647