const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRouter = require('./routes/user.router');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then( () => {
    console.log("MongoDb is connected successfully!!");
})
.catch((err) => {
    console.log(err);
});

app.use('/api/user', userRouter);


app.listen(3000, () => {
    console.log("Server is running at PORT 3000 !")
})