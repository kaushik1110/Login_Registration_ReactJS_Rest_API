const routes = require('express').Router();
const verify = require('./verifyToken');

const Model = require('../models/user');

const test =   routes.get('/', verify,  async(req, res)=>{
    
    let x = req.user._id;
    let info = await Model.findOne({_id : x});
    
    res.json(info);

});



module.exports = test;