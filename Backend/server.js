import express from "express";
import cors from "cors";
import helmet from "helmet"
import dotenv from "dotenv"
import morgan from "morgan"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import { connectDB } from "./src/config/db.js"
import authRoutes from "./src/routes/authRoutes.js"


// Loading the environment variables
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',

}));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);


//Backend Running Endpoint
app.get("/", (req, res) => {
    res.send("Backend is Running!!")
});


//Server Running Function
const runServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`)
        })
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

runServer();










