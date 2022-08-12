import jwt from "jsonwebtoken";
import { executeQuery } from "../../../../lib/db";
import bcrypt from "bcrypt";
export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const news = await executeQuery("SELECT * FROM news WHERE newsId=(?)", [
      id,
    ]);
    const data = { ...news[0] };
    return res.send(data);
  }
};
