import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors"
import bodyParser from "body-parser";
import createHttpError, { isHttpError } from "http-errors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import productRoutes from "./routes/products";
import stripeRouter from "./routes/stripe"
const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.use(
    express.urlencoded({ extended: true })
);
    

// authentication 
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use("/stripe", stripeRouter);

app.get("/", (req, res) =>
    res.json({ success: true, message: "enchante api is running!" })
);


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "Internal Server Error";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;