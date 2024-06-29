import express from "express";

const PORT = 4000;


const app = express();


const handleHome = (req, res) => {
    return res.send("hello world");
}
app.get("/", handleHome);


const handleLogin = (req, res) => {
    return res.send("Login Here");
}
app.get("/login", handleLogin);


const handleListening = () =>
    console.log(` ✅  Server Listenting on Port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);



