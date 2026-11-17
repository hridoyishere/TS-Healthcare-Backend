import { Router } from "express";
import upload from "../config/cloudinary.js";
import { getAllDoctors, AddDortors } from "../controller/doctor.js";

const router = Router();

router.get("/doctors", getAllDoctors);
router.post("/doctors", upload.single("image"), AddDortors);
export default router;
