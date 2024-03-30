const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/getcookies", (req, res) =>{
    res.cookie("greet", "hello");
    res.cookie("madeIn", "India");

    res.send("send you some cokiies");
});

app.get("/greet", (req, res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`hi ,${name}!`);
})

app.get("/",(req, res)=>{
    console.dir(req.cookies);
    res.send("hi i am root");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, ()=>{
    console.log("Server is listening to port 3000");
})
