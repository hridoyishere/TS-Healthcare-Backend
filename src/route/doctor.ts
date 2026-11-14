import { Router } from "express";
import { getAllDoctors } from "../controller/doctor.js";


const router = Router();

router.get("/doctors",getAllDoctors);

export default router;