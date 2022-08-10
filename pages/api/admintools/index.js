import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
export default async (req, res) => {
  if (req.method === "GET") {
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    if (user.role == "admin") {
      const users = await executeQuery(
        "SELECT COUNT(userId) AS user from users"
      );
      const pendingUsers = await executeQuery(
        "SELECT COUNT(userId) AS pendingUser from pendingUsers"
      );
      const result = {
        ...users[0],
        ...pendingUsers[0],
      };
      res.send(result);
    }
    return res.send(404);
  }
};
