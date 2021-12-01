const express = require("express");

const router = express.Router();

const Product = require("../models/products.model");

const sendMail = require('../utils/send-mail');

router.post( "" , async (req ,res) => {

    try{
     const product = await Product.create(req.body);

     sendMail(
         "g@g.com",
         "s@c.com",
         `create a product of ${ req.body.name}`,
         "Created a new product",
         "<h1>Created a new product<h1>",
        [
            {   // utf-8 string as an attachment
                filename: 'text1.txt',
                content: `Attachment formed successfully for  ${ req.body.name}`
            }
        ]
     )

     return res.send(product);

    }
    catch(e){
       return  res.status(500).send(e.message);
    }
})

router.get( "" , async (req ,res) => {

    try{
   
    const page = +req.query.page || 1;
    const size = +req.query.size || 2;
    const skip = (page - 1) * size;

    const products = await Product.find().skip(skip).limit(size).lean().exec();

    const totalPages = Math.ceil(
        ( await Product.find().countDocuments() )/size
    );

    return res.send( {products , totalPages} );
    }
    catch(e){
       return res.status(500).send(e.message);
    }
})

module.exports = router;