import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { executeQuery } from "../lib/db";

const registrationHandler = async (req) => {
  console.log(req.body.password);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  const result = await executeQuery(
    "INSERT INTO users VALUES(?,?,Name,Role,Description)",
    [req.body.email, hashedPassword]
  );
  return result;
};
module.exports = { registrationHandler };
