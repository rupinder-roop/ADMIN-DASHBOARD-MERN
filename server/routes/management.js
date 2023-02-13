import express from "express";
import { getAdmins, getUserPerformance ,getUser } from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);
router.get("/login",getUser)

export default router;
