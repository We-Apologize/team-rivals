import { executeQuery } from "../lib/db";

const loginHandler = async (req) => {
  const result = await executeQuery("SELECT*FROM users WHERE email=?", [
    req.body.email,
  ]);
  console.log(result);
  return result;
};
module.exports = { loginHandler };
