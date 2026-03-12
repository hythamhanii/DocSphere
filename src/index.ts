import "dotenv/config";
import cors from "cors";
import http from "http";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import express, { Request, Response } from "express";
import connectDatabase from "./config/database.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";



const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
)



app.get("/health",
    asyncHandler(async (req: Request, res: Response) => {
        res.status(HTTPSTATUS.OK).json({
            message: "Server is healthy",
            status: "OK",
        });
    })
);

// app.use("/api", routes);

app.use(errorHandler);

server.listen(Env.PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${Env.PORT} in  ${Env.NODE_ENV} mode`);
})
