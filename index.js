import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import dbConnect from './utils/db.js';
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js"

dotenv.config({});

const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});

const corsOptions = {
    origin: 'http://localhost:5173',  // Corrected URL
    credentials: true
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(port, () => {
    dbConnect();
    console.log(`Server is running at port ${port}`);  // Corrected typo here
});





