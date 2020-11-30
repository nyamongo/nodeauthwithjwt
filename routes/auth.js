const router = require('express').Router();
const User  = require('../model/User');
const {registerValidation,loginValidation}= require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async   (req,res) => {
    const {name,password,email} = req.body;
//validate the data
const {error} = registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

//Check if email exists
const emailExists = await User.findOne({email});
if(emailExists) return res.status(400).send("Email already exists");

//encrypt password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);

    const user = new User({
        name,
        password: hashedPassword,
        email
    });
    try{
        let savedUser = await user.save();
        res.send({user: user._id});
    }
    catch(err){
        res.status(400).send(err);
    }

})


router.post('/login',async   (req,res) => {
    const {password,email} = req.body;
//validate the data
const {error} = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

//Check if email exists
const user = await User.findOne({email});
if(!user) return res.status(400).send("Email is not found");

//password is correc
const validPassword = await bcrypt.compare(password,user.password);
if(!validPassword) return res.status(400).send("Invalid password");

//Create and assign token
const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
res.header('auth-token',token).send(token);
})



module.exports = router;