import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
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
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);

app.use(cors(corsOptions));
app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})