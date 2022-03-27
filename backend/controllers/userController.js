const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

//@descripcion: register new user
//@route  POST /api/user/
//@access Public

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //check if user exits!

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exits!')
    }

    //hash de password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

//@descripcion: Autenticacion a user
//@route  POST /api/user/login
//@access Public

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    //check for user email
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials!')
    }
})

//@descripcion: Get user DATA
//@route  GET /api/user/me
//@access PUBLIC

const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name: name,
        email: email,
    })
})


//generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe

}