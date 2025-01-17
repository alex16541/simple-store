import "server-only";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.POSTGRES_URL as string;

export const sql = neon(connectionString);
