import { executeQuery } from "../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { loginHandler } from "../../../utils/loginHandler";
export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    // console.log(req.body);
    const user = await loginHandler(req);
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user[0].Password
    );
    if (!matchPassword) {
      res.send(400);
    } else {
      const token = jwt.sign(
        {
          Email: user[0].Email,
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
      res.send(200);
    }
  }
};
