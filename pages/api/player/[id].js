import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
import bcrypt from "bcrypt";
export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const player = await executeQuery("SELECT * FROM player WHERE p_id=(?)", [
      id,
    ]);
    const data = { ...player[0] };
    return res.send(data);
  }
};
