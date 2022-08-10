import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
export default async (req, res) => {
  if (req.method === "GET") {
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    if (user.role == "admin") {
      const pendingusers = await executeQuery(
        "SELECT userId,email,createdAt FROM pendingUsers"
      );

      res.send(pendingusers);
    }
  } else if (req.method == "POST") {
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    if (user.role == "admin") {
      await executeQuery(
        "DELETE FROM pendingUsers WHERE createdAt<=DATE_SUB(NOW(), INTERVAL 1 DAY)"
      );

      res.send(200);
    }
  }
};
