const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.route.js');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, )
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.use(
    cors({
      origin: "*",
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    })
  );

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});