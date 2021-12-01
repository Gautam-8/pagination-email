const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./config/db");
//https://mailtrap.io/
//npm install nodemailer
//npm install dotenv
const productscontroller = require("./controllers/products.controller");
app.use("/products" , productscontroller);

const usersController = require('./controllers/users.conrollers');
app.use("/users" , usersController);

app.listen(5555, async () => {

    await connect();

    console.log("listening on port 5555");

})