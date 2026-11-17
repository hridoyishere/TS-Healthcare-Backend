import db from "../config/database.js";
import { streamUpload } from "../middleware/Upload_cloudinary.js";
import type { Request, Response } from "express";

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM Doctor");
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const AddDortors = async (req: Request, res: Response) => {
  try {
    const {
      name,
      specialization,
      email,
      phone,
      address,
      workingHours,
      rating,
      experience,
      about,
    } = req.body;
    console.log("Request Body:", req.body);

    // 1. Check for required text fields
    if (
      !name ||
      !specialization ||
      !email ||
      !phone ||
      !address ||
      !workingHours ||
      !rating ||
      !experience ||
      !about
    ) {
      return res.status(400).json({
        success: false,
        message: "All text fields are required",
      });
    }

    // 2. Check for the file (critical)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Doctor image is required",
      });
    }

    // 3. AWAIT the upload
    const uploadResult: any = await streamUpload(req.file, name);
    const finalImageUrl = uploadResult.secure_url;

    // 4. Fix the VALUES array (no keys inside the array)
    const query = `INSERT INTO Doctor (name, specialization, imageUrl, email, phone, address, workingHours, rating, experience, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

    const values = [
      name,
      specialization,
      finalImageUrl, // Correct position
      email,
      phone,
      address,
      workingHours,
      rating,
      experience,
      about,
    ];

    // Upload
    const dbResult = await db.query(query, values);

    res.status(201).json({
      success: true,
      data: dbResult.rows[0],
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
