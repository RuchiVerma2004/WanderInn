const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views" , path.join( __dirname, "views"));

const sessionOptions = {
  secret: 'mysupersecretstring',
  resave: false,
  saveUninitialized: true,
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) =>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsh = req.flash("error");
  next();
});

app.get("/register", (req, res)=>{
  let {name = "anonymous"} = req.query;
  req.session.name = name;
  if(name === "anonymous"){
    req.flash("error", "user not registered");
  }else{
    req.flash("success", "user registered successfully");
  }
  
  res.redirect("/hello");
});

app.get("/hello", (req, res) =>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");

  res.render("page.ejs", {name: req.session.name, msg: req.flash("success")});
});
// app.get("/reqcount", (req, res) =>{
//   if(req.session.visits){
//     req.session.visits++;
//   } else {
//   req.session.count = 1;
// }
//     res.send(`you sent a request ${req.session.count} time(s)`);
// });

// app.get("/test", (req, res) =>{
//     res.send("test successful!");
// });
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) =>{
//     res.cookie("made-in", "India", {signed: true});
//     res.send(`Cookie has been set`);
// });;

// app.get("/getcookies", (req, res) =>{
//     res.cookie("greet", "hello");
//     res.cookie("madeIn", "India");

//     res.send("send you some cokiies");
// });

// app.get("/verify", (req, res) =>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/greet", (req, res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`hi ,${name}!`);
// })

// app.get("/",(req, res)=>{
//     console.dir(req.cookies);
//     res.send("hi i am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, ()=>{
    console.log("Server is listening to port 3000");
})
