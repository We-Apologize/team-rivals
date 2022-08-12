import jwt from "jsonwebtoken";
import { executeQuery } from "../../../../lib/db";
import bcrypt from "bcrypt";
import comment from "./comment";
export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const news = await executeQuery("SELECT * FROM news  WHERE newsId=(?)", [
      id,
    ]);
    const comments = await executeQuery(
      "SELECT * FROM comment WHERE newsId=(?)",
      [id]
    );
    const data = { ...news[0], comments: comments };
    //for comment in news
    return res.send(data);
  }
};
