import express from "express";
import cors from "cors";

//Files
import doctorRouter from "./route/doctor.js"


const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));



app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthcare API is running",
  });
});

app.use("/api",doctorRouter);

export default app;