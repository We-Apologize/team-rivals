import { executeQuery } from "../../../../lib/db";

export default async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.query;

    await executeQuery("INSERT INTO comment VALUES(?,?,?,?) ", [
      req.body.commentId,
      req.body.comment,
      req.body.authorName,
      req.body.newsId,
    ]);

    return res.send(200);
  }
};
