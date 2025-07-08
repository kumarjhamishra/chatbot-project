import express from "express";
import { config } from "dotenv"; 
// logging HTTP request middleware
import morgan from 'morgan';
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"

config()

const app = express();

// middle waare to read the json data
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

// will remove this logging functionality at the time of production
app.use(morgan("dev"))

app.use("/api/v1", router)

export default app