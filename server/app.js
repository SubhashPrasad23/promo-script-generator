import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/generate-video", generateRoute);

app.get("/", (req, res) => {
    res.send("Backend running ");
});

app.listen(5000, () => {
    console.log("Server running on 5000");
});