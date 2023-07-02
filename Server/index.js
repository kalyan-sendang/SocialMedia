import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import MessageRoute from './Routes/MessageRoute.js'

import ChatRoute from './Routes/ChatRoute.js'
//Routes
const app = express();

//serve images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

// Middleware setup
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Routes setup
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

//external enviroment
dotenv.config();

// Database connection and server start
mongoose.connect(process.env.MONGO_DB).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening at port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
