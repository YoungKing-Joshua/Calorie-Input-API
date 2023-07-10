import { connection } from "../routes/pgConnection";
import axios from "axios";

export type CalorieEntry = {
  id?: number;
  user_id: number;
  date: Date;
  time: string;
  calories: number;
  isBelowExpection: boolean;
};

export class CalorieEntryModel {
  async index(): Promise<CalorieEntry[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "SELECT * FROM calories_entries";
      const result = await conn.query(sql);
      conn.end();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find entries. Error: ${err}`);
    }
  }

  async create(entry: CalorieEntry): Promise<CalorieEntry[]> {
    try {
      const sql = `INSERT INTO calorie_entries (user_id, date, time, text, calories, is_below_expected) VALUES ($1, $2, $3, $4, $5, $6)*`;      ;
      const conn = connection();
      await conn.connect();
      await conn.query(sql, [
        entry.user_id, 
        entry.date, 
        entry.time,
        entry.calories,
        entry.isBelowExpection,]);
      const output = await conn.query(
        "SELECT * FROM calorie_entries WHERE user_id=($1)",
        [entry.user_id]
      );

      conn.end();
      return output.rows;
    } catch (err) {
      throw new Error(`Could not add new entry. Error: ${err}`);
    }
  }

  async show(id: string): Promise<CalorieEntry[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "SELECT * FROM calories_entries WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.end();
      //console.log(result.rows)
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find entry ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<CalorieEntry[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "DELETE FROM calories_entries WHERE id=($1)";
      await conn.query(sql, [id]);
      const output = await conn.query("SELECT * FROM calories_entries");
      conn.end();
      //console.log(output.rows)
      return output.rows;
    } catch (err) {
      throw new Error(`Could not find entry. Error: ${err}`);
    }
  }
}
