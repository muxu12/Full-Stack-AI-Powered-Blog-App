import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import adminRouter from "./Routes/adminRoutes.js";
import blogRouter from "./Routes/blogRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();

await connectDb();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

export default app;
