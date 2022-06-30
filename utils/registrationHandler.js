import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { executeQuery } from "../lib/db";

const registrationHandler = async (req) => {
  console.log(req.body.password);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  await executeQuery("INSERT INTO pendingUsers (email,password) VALUES(?,?)", [
    req.body.email,
    hashedPassword,
  ]);
  const result = await executeQuery(
    "SELECT userId FROM pendingUsers WHERE email=(?)",
    [req.body.email]
  );

  const token = jwt.sign(
    {
      userId: result[0].userId,
      email: req.body.email,
    },
    process.env.EMAIL_SECRET,
    { expiresIn: "6h" }
  );
  return token;
};
module.exports = { registrationHandler };
