
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRouter from './routes/posts.mjs';
import authRouter from './routes/auth.mjs';


const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/',postRouter);
app.use('/',authRouter);


//connection with databise of mongodb 
mongoose.connect("mongodb://localhost:27017/memorys", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("DB connected")
})

//port run 
app.listen(9002,() => {
    console.log("BE started at port 9002")
})