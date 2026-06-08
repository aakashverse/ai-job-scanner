const userModel = require("../model/user.model");
const tokenBlacklistModel = require("../model/blacklist.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
async function registerController(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide complete credentials!"
        })
    }
    
    // user exist
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}] // or -> checks both condition
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User Already Exists, Please try Login!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    
    const token = jwt.sign(
        {id: newUser._id, username: newUser.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully!",
        user: {
            id: newUser._id,
            username: newUser .username,
            email: newUser.email
        }
    })

}

// LOGIN 
async function loginController(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    return res.status(201).json({
        message: "login successful!",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },

    })
}

// LOGOUT
async function logoutController(req, res) {
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token});
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logged out successfully"
    })
}

// get-me
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    return res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMeController
}