import { executeQuery } from "../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { loginHandler } from "../../../utils/loginHandler";
export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    const user = await loginHandler(req);
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user[0].Password
    );
    console.log("from database");
    const currentUser = { ...user[0] };
    console.log(currentUser);
    if (!matchPassword) {
      res.send(404);
    } else {
      const token = jwt.sign(
        {
          Email: currentUser.Email,
        },
        process.env.SECRET,
        { expiresIn: "12h" }
      );
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("user", token, {
          httpOnly: true,
          path: "/",
          maxAge: 12 * 3600,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        })
      );
      res.send(currentUser);
    }
  }
};
