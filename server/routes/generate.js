import express from "express";
import { generateVideo } from "../controllers/generateController.js";

const router = express.Router();
router.post("/", generateVideo);
export default router;