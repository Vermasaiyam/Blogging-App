const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");

const router = Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.resolve(`./public/images/`))
//     },
//     filename: function (req, file, cb) {
//         const fileName = `${Date.now()}-${file.originalname}`;
//         cb(null, fileName);
//     }
// })

// const upload = multer({ storage: storage });

router.get('/signin', (req, res) => {
    return res.render('signin');
})
router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        // console.log("token", token);
        res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: "Incorrect email or password.",
        })
    }
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    // console.log(req.file);
    

    await User.create({
        fullName,
        email,
        password,
        // profileImageUrl: `/images/${req.file.filename}`,
    })
    res.redirect('/user/signin');
})

router.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect('/user/signin');
})

module.exports = router;