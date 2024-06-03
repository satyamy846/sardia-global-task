import express from 'express';
import dotenv from 'dotenv';
import { mongooseConnection } from './config/Connection.js';

import globalErrorResponse from './utilities/errorHelpers/GlobalErrorResponse.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/User.js';
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({origin: "http://localhost:5173", credentials: true}));


app.use(userRoute);



app.get("/", (req, res) => {
    res.send(`Server is running`);
})

mongooseConnection();
app.use(globalErrorResponse);

app.use(userRoute);

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server instance running http://localhost:${PORT}`);
});