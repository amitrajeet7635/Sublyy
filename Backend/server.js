import express from "express";
import cors from "cors";
import helmet from "helmet"
import dotenv from "dotenv"
import morgan from "morgan"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import { connectDB } from "./src/config/db.js"
import session from "express-session";
import passport from "passport";
import authRoutes from "./src/routes/authRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import MongoStore from "connect-mongo";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import './src/config/passport.js';


// Loading the environment variables
dotenv.config()

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

// Store userId <-> socketId mapping
const userSockets = new Map();

io.on("connection", (socket) => {
    socket.on("register", (userId) => {
        userSockets.set(userId, socket.id);
    });
    socket.on("disconnect", () => {
        for (const [userId, sockId] of userSockets.entries()) {
            if (sockId === socket.id) userSockets.delete(userId);
        }
    });
});

app.set("io", io);
app.set("userSockets", userSockets);

//Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',

}));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
        }),
        cookie: {
            secure: false,  // Set to true if using HTTPS
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
        }),
        cookie: {
            secure: false,  // Set to true if using HTTPS
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/user", userRoutes);


//Backend Running Endpoint
app.get("/", (req, res) => {
    res.send("Backend is Running!!")
});

const PORT = process.env.PORT || 3000;

//Server Running Function
const runServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`)
        })
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

runServer();










