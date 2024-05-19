import express from "express";
import { addSleepRecord, getSleepRecordsByUserId, deleteSleepRecordById } from "../controllers/sleep.controller.js";

const router = express.Router();


//defining routes for all the API calls
router.post("/", addSleepRecord);
router.get("/:userId", getSleepRecordsByUserId);
router.delete("/:recordId", deleteSleepRecordById);

export default router;
