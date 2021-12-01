const express = require("express");

const router = express.Router();

const User = require("../models/users.model");

const sendMail = require('../utils/send-mail');

router.post( "" , async (req ,res) => {

    try{
     const user = await User.create(req.body);

     sendMail(
         "abc@abc.com",
         `${req.body.email}`,
         `Welcome to ABC ${ req.body.first_name} ${req.body.last_name}`,
        `Hi ${req.body.first_name}, Please confirm your email address`,
         `<h1>Hi ${req.body.first_name}, Please confirm your email address<h1>`,
        [
            {   // utf-8 string as an attachment
                filename: 'text1.txt',
                content: `Registeration success ${ req.body.first_name} !`
            }
        ]
     )

    const admin_arr = ["admin1@abc.com","admin2@abc.com","admin3@abc.com","admin3@abc.com","admin5@abc.com" ]
       

            sendMail(
                "abc@abc.com",
                  admin_arr,
                `${ req.body.first_name} ${req.body.last_name} has registered with us`,
               `Please welcome ${req.body.first_name}`,
                `<h1>Please welcome ${req.body.first_name}<h1>`,
               [
                   {   // utf-8 string as an attachment
                       filename: 'text1.txt',
                       content: `Registeration success ${ req.body.first_name} !`
                   }
               ]
            )
         


     return res.send(user);

    }
    catch(e){
       return  res.status(500).send(e.message);
    }
})

router.get( "" , async (req ,res) => {

    try{
   
    const page = +req.query.page || 1;
    const size = +req.query.size || 4;
    const skip = (page - 1) * size;

    const users = await User.find().skip(skip).limit(size).lean().exec();

    const totalPages = Math.ceil(
        ( await User.find().countDocuments() )/size
    );

    return res.send( {users , totalPages} );
    }
    catch(e){
       return res.status(500).send(e.message);
    }
})

module.exports = router;