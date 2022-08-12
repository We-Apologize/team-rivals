import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
import bcrypt from "bcrypt";
export default async (req, res) => {
  if (req.method === "GET") {
    const data = await executeQuery(
      "SELECT newsId,newsTitle,url,publishedAt FROM news ORDER BY publishedAt DESC LIMIT 3"
    );
    return res.send(Object.values(JSON.parse(JSON.stringify(data))));
  }
};
