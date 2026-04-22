import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();

const allowedOrigins = [
    "http://localhost:5173", 
    "https://promo-script-generator.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true
}));

app.use(express.json());

app.use("/generate-video", generateRoute);

app.get("/", (req, res) => {
    res.send("Backend running ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});