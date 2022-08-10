import { executeQuery } from "../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { loginHandler } from "../../../utils/loginHandler";
import { settCookie } from "../../../utils/settCookie";

export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    const user = await loginHandler(req);
    console.log(user);
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    console.log("from database");
    const currentUser = {
      id: user[0].userId,
      email: user[0].email,
      role: user[0].role,
      description: user[0].description,
    };
    console.log(currentUser);
    if (!matchPassword) {
      res.send(404);
    } else {
      settCookie(req, res, currentUser);
      res.send(currentUser);
    }
  }
};
