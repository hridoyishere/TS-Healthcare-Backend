import db from "../config/database.js";
import type { Request, Response } from "express";

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
