import type { QueryResultRow } from "pg";

export interface Product extends QueryResultRow {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  email: string;
  phone: number;
  address: string | null;

  workingHours: string[];
  rating: number;
  experience: number;
  about: string | null;
  created_at: Date;
  updated_at: Date;
}