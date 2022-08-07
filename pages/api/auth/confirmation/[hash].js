import jwt from "jsonwebtoken";
import { executeQuery } from "../../../../lib/db";
import { settCookie } from "../../../../utils/settCookie";
export default async (req, res) => {
  if (req.method === "POST") {
    res.status(403).json({ msg: "dont have access" });
  }
  const { hash } = req.query;
  const user = jwt.verify(hash, process.env.EMAIL_SECRET);
  if (user) {
    const getPass = await executeQuery(
      "SELECT*FROM pendingUsers WHERE userId=(?)",
      [user.userId]
    );
    await executeQuery("DELETE FROM pendingUsers WHERE userId=(?)", [
      user.userId,
    ]);
    const userId = Date.now();
    await executeQuery(
      "INSERT INTO users (userId, email,password) VALUES(?,?,?)",
      [userId, user.email, getPass[0].password]
    );
    const currentUser = {
      id: userId,
      email: user.email,
      role: "user",
      description: "",
    };
    settCookie(req, res, currentUser);
    res.redirect("/");
  }
};
