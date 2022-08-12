import { executeQuery } from "../../../lib/db";
import { registrationHandler } from "../../../utils/registrationHandler";
import { confirmMail } from "../../../utils/confirmMail";

export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    console.log(req.body);
    const user = await executeQuery(
      "SELECT userId FROM users WHERE email=(?)",
      [req.body.email]
    );
    console.log(user);
    if (user.length != 0) {
      res.json({ msg: "user already exists",err:true });
      return res.end();
    }
    const token = await registrationHandler(req);
    const confirmUser = {
      email: req.body.email,
      token: token,
    };
    const result = await confirmMail(confirmUser);
    console.log(result);
    return res
      .status(201)
      .json({ msg: "One more step! Please check your email to activate account!",err: false });
  }
};
