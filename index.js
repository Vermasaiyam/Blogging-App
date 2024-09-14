const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(()=> console.log("MongoDb Connected."))

// ejs - views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res)=>{
    console.log(req.user);
    if (req.user === null) return res.render("home",{user: null});
    // const allBlogs = await Blog.find({createdBy: req.user._id});
    const allBlogs = await Blog.find({});
    
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})
app.get('/blogs', async (req, res)=>{
    console.log(req.user);
    if (req.user === null) return res.render("home",{user: null});
    const allBlogs = await Blog.find({createdBy: req.user._id});
    // const allBlogs = await Blog.find({});
    
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, ()=>{console.log(`Server started at Port: ${PORT}`);})