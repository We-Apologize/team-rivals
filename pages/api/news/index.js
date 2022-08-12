import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
import bcrypt from "bcrypt";
export default async (req, res) => {
  if (req.method === "POST") {
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    if (user.role == "editor") {
      await executeQuery(
        "INSERT INTO news (newsId,newsTitle,newsDescription,authorId,authorName,publishedAt) VALUES(?,?,?,?,?,?)",
        [
          req.body.id,
          req.body.title,
          req.body.description,
          req.body.author,
          req.body.authorName,
          req.body.time,
        ]
      );
      return res.send(200);
    }
  }
  if (req.method === "GET") {
    const data = await executeQuery(
      "SELECT newsId,newsTitle,publishedAt FROM news"
    );
    return res.send(Object.values(JSON.parse(JSON.stringify(data))));
  }
};
