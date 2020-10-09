const express = require('express');
const app = express();

const routes = require('express').Router();

const userModel = require('../models/user');

const userInfo = require('../models/userInfo');

const verify = require('./verifyToken');

//validation function import
const {
    userValidation,
    loginValidation,
    userInfoValidation
} = require('../validation');


// password Hash
const bcrypt = require('bcryptjs');


// JsonWebToken
const jwt = require('jsonwebtoken');
const user = require('../models/user');

var bodyParser = require('body-parser');

const multer = require('multer');

app.use(bodyParser.urlencoded({
    extended: false
}));

const path = require('path');

const fs = require('fs');
const {
    route
} = require('./test');

// ----------------------------------------------------------------------------------------------------------

// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static('uploads'));
// app.use(express.static('public'));


var storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('only jpg'), true);
        // cb(null, true);

    }

};

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
}).single('file');

//------------------------------------------------------------------------------------------------------------

routes.post('/', upload, async (req, res) => {
    console.log(req.file);
    console.log('working');
    // const {errors} = joi.validate(req.body, schema);

    const {
        error
    } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check email is exist or not

    const emailExist = await userModel.findOne({
        email: req.body.email
    });

    if (emailExist) {
        return res.status(400).send('Email is Exist')
    };

    // Hash Password
    const salt = await bcrypt.genSalt(1);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);


    let userInsert = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
        image: 'http://localhost:3000/images/sshhttiissddeessaaii6600112233665544/' + req.file.filename
    });

    try {
        const saveuser = await userInsert.save();
        res.send(saveuser);
    } catch (error) {
        res.status(400).send(error);
    }

});


routes.post('/login', async (req, res) => {

    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const findUser = await userModel.findOne({
        email: req.body.email
    });

    if (!findUser) {
        return res.status(400).send('Email Not Found');
    }

    const validPassword = await bcrypt.compare(req.body.password, findUser.password)
    if (!validPassword) {
        return res.status(400).send('Password Is Wrong');
    }

    const token = jwt.sign({
        _id: findUser._id
    }, 'shatishdesai');
    res.header('authentication-token', token).send(token);

});

routes.get('/', (req, res) => {
    // res.writeHead(200,{'content-type':'image/jpg'});
    // fs.createReadStream('../public/uploads/file_1602049826236.jpg');
});


routes.post('/addUserInfo', verify, async (req, res) => {

    const {
        error
    } = userInfoValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userinfoInsert = new userInfo({

        userID: req.user._id,
        address: req.body.address,
        gender: req.body.gender,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        birthdate: req.body.birthdate,
        zip: req.body.zip,
        hobby: req.body.hobby

    });

    try {
        const saveUserinfo = await userinfoInsert.save();
        res.send(saveUserinfo);
    } catch (error) {
        res.status(400).send(error);
    }

});

routes.get('/addUserInfo/getdata', verify, async (req, res) => {

    let x = req.user._id;
    let info = await userInfo.findOne({
        userID: x
    });

    res.json(info);
});

routes.patch('/addUserInfo/update', verify,async (req, res) => {

    const {
        error
    } = userInfoValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await userInfo.findOneAndUpdate({
            userID : req.user._id
    }, {
        $set: {
            address: req.body.address,
            gender: req.body.gender,
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
            birthdate: req.body.birthdate,
            zip: req.body.zip,
            hobby: req.body.hobby
        }
    });

    let x = req.user._id;
    let info = await userInfo.findOne({
        userID: x
    });

    res.json(info);
    
});

module.exports = routes;