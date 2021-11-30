const express = require('express');

const router=express.Router();

const User = require('../models/user.model');

const sendMail=require('../utils/send-mail');

router.get("/",async (req, res) => {
    try {
        const page= +req.query.page || 1;
        const size = +req.query.size || 2;

        const skip=(page-1)*size;

        const users= await User.find({}).skip(skip).limit(size).lean().exec();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).json({message: err.message,error:"Failed"});
    }
})

router.post("/",async (req, res) => {
    try {
        const user= await User.create(req.body);
        if(user.role=="user") {
            sendMail("ABCSystem@gmail.com","user@gmail.com",`Welcome to ABC system ${user.first_name} ${user.last_name}`,`Hi ${user.first_name},
            Please Confirm your email address`,"<h2>Welcome to ABC system User</h2>");

            const users= await User.find({role:"admin"}).lean().exec();
            for(let i=0;i<3;i++) {
                sendMail("ABCSystem@gmail.com","admin@gmail.com",`${user.first_name} ${user.last_name} has registered with us`,`please welcome ${user.first_name},
                ${user.last_name}`,"<h2>Please welcome user 2</h2>")
            }
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({message: err.message,error:"Failed"});
    }
})

router.delete("/:id",async (req, res) => {
    try {
        const user= await User.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({message: err.message,error:"Failed"});
    }
})


module.exports= router;