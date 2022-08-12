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
    await executeQuery(
      "INSERT INTO users (name, email,password,role,description) VALUES(?,?,?,?,?)",
      ["", user.email, getPass[0].password, "user", ""]
    );
    const userId = await executeQuery(
      "SELECT userId From users WHERE email=(?)",
      [user.email]
    );
    const currentUser = {
      id: userId[0].userId,
      email: user.email,
      role: "user",
      description: "",
    };
    settCookie(req, res, currentUser);
    res.redirect("/");
  }
};
