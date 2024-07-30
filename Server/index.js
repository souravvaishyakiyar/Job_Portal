import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();


mongoose.connect(process.env.mongo).then(()=>{
    console.log("Connected to mongodb");
})
.catch((err)=>{
    console.log(err);
})

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));
app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})