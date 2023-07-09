import { connection } from "../routes/pgConnection";
import axios from "axios";

export type CalorieEntry = {
  id?: number;
  userId: number;
  date: Date;
  time: string;
  text: string;
  calories: number;
  isBelowExpected: boolean;
};

export class CalorieEntryModel {
  static async createCalorieEntry(entry: CalorieEntry): Promise<CalorieEntry> {
    const conn = await connection();
    const { userId, date, time, text } = entry;

    let { calories } = entry;
    if (!calories) {
      // Fetch calories from external API provider
      try {
        const response = await axios.get(
          "https://www.nutritionix.com/api/v1/calories",
          {
            params: {
              text,
            },
          }
        );
        calories = response.data.calories;
      } catch (error) {
        throw new Error("Failed to fetch calories from the API provider.");
      }
    }

    const expectedCalories = 2000; // Example: Replace with actual expected calories per day

    const isBelowExpected = calories < expectedCalories;

    const sql =
      "INSERT INTO calorie_entries (user_id, date, time, text, calories, is_below_expected) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const result = await conn.query(sql, [
      userId,
      date,
      time,
      text,
      calories,
      isBelowExpected,
    ]);
    conn.release();
    return result.rows[0];
  }

  static async getCalorieEntriesByUser(userId: number): Promise<CalorieEntry[]> {
    const conn = await connection();
    const sql = "SELECT * FROM calorie_entries WHERE user_id = $1";
    const result = await conn.query(sql, [userId]);
    conn.release();
    return result.rows;
  }

  static async getCalorieEntryById(id: number): Promise<CalorieEntry | null> {
    const conn = await connection();
    const sql = "SELECT * FROM calorie_entries WHERE id = $1";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows.length ? result.rows[0] : null;
  }

  static async updateCalorieEntry(
    id: number,
    entry: Partial<CalorieEntry>
  ): Promise<CalorieEntry | null> {
    const conn = await connection();
    const { date, time, text, calories } = entry;
    const sql =
      "UPDATE calorie_entries SET date = $1, time = $2, text = $3, calories = $4 WHERE id = $5 RETURNING *";
    const result = await conn.query(sql, [date, time, text, calories, id]);
    conn.release();
    return result.rows.length ? result.rows[0] : null;
  }

  static async deleteCalorieEntry(id: number): Promise<boolean> {
    const conn = await connection();
    const sql = "DELETE FROM calorie_entries WHERE id = $1";
    await conn.query(sql, [id]);
    conn.release();
    return true;
  }
}
